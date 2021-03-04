import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ show, setToken, setError, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const loginSubmit = (e) => {
    e.preventDefault()
    login({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    })
  }

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      setPage('authors')
    }
  }, [result.data, setToken, setPage])

  // if (!show) {
  //   return null
  // }
  return (
    <form onSubmit={loginSubmit}>
      username:
      <input type="text" name="username" />
      password:
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
