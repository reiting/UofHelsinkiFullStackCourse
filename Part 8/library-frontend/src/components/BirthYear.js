import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const BirthYear = ({ options }) => {
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
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            options={options}
            onChange={({ label }) => setName(label)}
            value={{ label: name, value: name }}
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