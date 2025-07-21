import React from 'react'
import Sideright from './Sideright'
import Sideleft from './Sideleft'

const Login = () => {
  return (
    <div className='flex w-screen h-screen'>
      <div className='w-[400px] h-full'>
        <Sideleft/>
      </div>
      <div className='flex-1 h-full'>
        <Sideright/>
      </div>
      
    </div>
  )
}

export default Login
