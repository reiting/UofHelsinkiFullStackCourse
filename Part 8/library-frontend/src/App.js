import { useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import { ME } from './queries'
import Recommended from './components/Recommended'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const meQuery = useQuery(ME)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('user-token', token);
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  useEffect(() => {
    if (meQuery.data) {
      setUser(meQuery.data.me)
    }
  }, [meQuery])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommended')}>Recommended</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>log in</button>}
        {token && <button onClick={() => logout()}>log out</button>}
      </div>
      <div>{error}</div>

      <Authors
        show={page === 'authors'} setError={setError}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended 
        show={page === 'recommended'} 
      />

    {user && (
      <NewBook
        show={page === 'add'} user={user} setError={setError}
      />
    )}

    <Login
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
        setPage={setPage}
      />

    </div>
  )
}

export default App