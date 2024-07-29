

import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        setLoading(true)
        setError(false);
        const res = await fetch('/api/auth/signup', {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
        });
          const data = await res.json();
          console.log(data);
          setLoading(false)
          if (data.success === false) {
            setError(true);
            return
          }
          navigate('/sign')
        
           
           
        
      } catch (error) {
        setLoading(false);
        setError(true)
        
      }
  };


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl text-center font-semibold my-7'>Sign up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' id='username' onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <input type='email' placeholder='email' id='email' onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <input type='password' placeholder='password' id='password' onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <button disabled={loading} className='bg-slate-500 rounded-lg text-white p-3 uppercase 
        hover:opacity-75'>{loading ? 'Loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      <p className='text-red-500 mt-5'>{error && 'Something went wrong!'}</p>
    </div>
  )
}
