import {BrouterRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
  return (
    <BrouterRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn />}/>
      <Route path="/Sign-up" element={<SignUp />}/>
      <Route path="/profile" element={<Profile/>}/>

    </Routes>
    
    </BrouterRouter>
  )
}
