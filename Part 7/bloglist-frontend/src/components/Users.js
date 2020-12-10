import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector((state) => state.users)

  return (
    <>
      <h1>Users</h1>
        <h3>Usernames:</h3>
        <ul>
          {users?.map((user) => (
            <li key={user?.id}>
              <Link to={`/users/${user.id}`}>
                <p >{user?.username}</p>
                </Link>
                <p>
                 blogs created: {user?.blogs?.length}
                </p>
             
            </li>
          ))}
        </ul>
    </>
  )
}

export default Users