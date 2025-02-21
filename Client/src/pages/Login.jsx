import React,{useState} from 'react'
import { assets } from '../assets/assets'

function Login() {
  const [state,setState] = useState('Sign Up')
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img src={assets.logo} alt="Logo" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
        <h2>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p>{state === 'Sign Up' ? 'Create your account' : 'Login to your acount'}</p>
        <form>
          <div className='flex items-center gap-3 mt-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.person_icon} alt="" />
          <input className='bg-transparent outline-none' type="text" placeholder='Full Name' required />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
