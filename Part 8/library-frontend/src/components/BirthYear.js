import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthYear = () => {
  const [name, setName] = useState('')
  let [born, setborn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()
    born = Number(born);
    editAuthor({ variables: { name, born } })

    setName('')
    setborn('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setborn(target.value)}
          />
        </div>
        <button type='submit'>Update Year</button>
      </form>
    </div>
  )
}

export default BirthYear