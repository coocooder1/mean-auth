

import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(loading, error)
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/signin', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        });
          const data = await res.json();

          dispatch(signInSuccess(data));
          if (data.success === false) {
            dispatch(signInFailure(data.message));
            return
          }
          dispatch(signInFailure(data.message));
          navigate('/')
        
           
           
        
      } catch (error) {
        dispatch(signInFailure(error))
        
      }
  };


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
       
        <input type='email' placeholder='email' id='email' onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <input type='password' placeholder='password' id='password' onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <button disabled={loading} className='bg-slate-500 rounded-lg text-white p-3 uppercase 
        hover:opacity-75'>{loading ? 'Loading...' : 'Sign In'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't Have an account?</p>
        <Link to='/sign-up'>
        <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error ? error.message||'Something went wrong!':'' }</p>
    </div>
  )
}

