import { useState, useCallback } from 'react'
import { ErrorDialog } from '../ErrorDialog'
import { Loading } from '../Loading'
import { Navigate } from 'react-router-dom'

import * as api from '../api'

export default function LoginPage () {
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const isEnabled = username.length >= 3

  const onLogin = async (u) => {
    try {
      setIsLoading(true)
      await api.checkUserExists(u)
      window.localStorage.setItem('username', u)
      setErrorMessage('')
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      if (e.status === 500) {
        setErrorMessage('There is a problem with the server')
      } else if (e.status === 400) {
        setErrorMessage('Invalid username/password')
      }
    }
  }

  const errorElement = (
    <div className='px-3 py-1.5'>
      <ErrorDialog bold={errorMessage} permenant />
    </div>
  )

  if (window.localStorage.getItem('username')) {
    return <Navigate replace to='/' />
  } else {
    return (
      <div className='flex w-screen h-screen justify-center place-items-center'>
        <Loading show={isLoading}>
          <div className='border-2 border-black p-6 shadow-lg max-w-sm mx-auto flex flex-col items-center space-y-4'>
            <div className='text-xl font-medium text-black'>RIE</div>
            {errorMessage ? errorElement : <></>}
            <div>
              <input
                type='text' className='
                px-3
              py-1.5
              border
              transition
              ease-in-out
              h-full
              w-full
              focus:border-blue-300 focus:outline-none
            ' placeholder='Username'
                onChange={(ev) => {
                  setUsername(ev.target.value)
                }}
                value={username}
              />
            </div>
            <div>
              <input
                type='password' className='
              px-3
              py-1.5
              border
              transition
              ease-in-out
              h-full
              w-full
              focus:border-blue-300 focus:outline-none
            ' placeholder='Password'
              />
            </div>
            <div className='cursor-pointer hover:underline decoration-dashed' onClick={() => window.alert('Too bad!')}>Forgot credentials?</div>
            <div>

              <div
                className={`px-3 py-1.5 border transition h-full align-bottom 
                  active:bg-gray-100 cursor-pointer`}
                onClick={isEnabled ? () => onLogin(username) : () => {}}
              > Log in &gt;
              </div>

            </div>
          </div>
        </Loading>
      </div>
    )
  }
}
