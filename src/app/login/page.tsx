'use client'

import { useState } from 'react'
import SignUpForm from './signup-form'
import LoginForm from './login-form'
import Image from 'next/image'
import kindeLogo from '../../../public/logo-kinde.jpeg'


const LoginPage = () => {
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <main className='w-screen h-screen flex flex-col'>
      <div className={`relative w-full ${showSignUp ? 'h-[64px]' : 'h-[30%]'} bg-primary flex items-center justify-center`}>
        <div className={`max-w-screen-sm mx-auto ${showSignUp ? 'h-[100%]' : 'h-[80%]'}`}>
          <Image
            src="/logo-1024.png"
            alt="App logo"
            fill
            objectFit='contain'
          />
        </div>
      </div>
      <div className='w-full sm:max-w-[460px] sm:m-auto flex-1 bg-background flex flex-col items-center justify-start'>
        {showSignUp ? <SignUpForm setShowSignUp={setShowSignUp} /> : <LoginForm />}
        {/* <p className='text-base my-4'>{showSignUp ? 'Já possui conta?' : 'Não possui conta?'} <span
          className='text-lg font-bold text-primary underline cursor-pointer'
          onClick={() => setShowSignUp(!showSignUp)}
        >{showSignUp ? 'Entre' : 'Cadastre'}</span>
        </p> */}
        <div className='w-full mt-2 flex justify-center items-center gap-2'>
          <p>Login gerenciado por</p>
          <a href='https://kinde.com/' target='_blank'>
            <Image
              src={kindeLogo}
              alt='Kinde logo'
              width={56}
              height={56}
            />
          </a>
        </div>
      </div>
    </main>
  )
}

export default LoginPage