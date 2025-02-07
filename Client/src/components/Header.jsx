import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='flex flex-col items-center'>
      <img src={assets.header_img} alt=""
      className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Developer 
        <img className='w-8 aspect-square' src={assets.hand_wave} alt=""/></h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to Our App</h2>
      <button className='bg-gray-500 hover:bg-blue-600 rounded-md px-4 py-2 mt-3 text-white'>Get Started</button>
    </div>
  )
}

export default Header
