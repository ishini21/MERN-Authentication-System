import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function Navbar() {

    const navigate = useNavigate()

  return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>
      <img src={assets.logo} alt="Logo" className='w-28 sm:w-32' />

      <button onClick={()=>navigate('/login')} className='flex items-center gap-2 bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-all'> Login <img src={assets.arrow_icon} alt="login icon"/></button>
    </div>
  )
}

export default Navbar
