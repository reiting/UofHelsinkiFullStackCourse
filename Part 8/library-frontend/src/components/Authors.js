import React, { useEffect, useState } from 'react'
import { ALL_AUTHORS } from '../queries'
import { useQuery } from '@apollo/client'
import BirthYear from './BirthYear'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const result = useQuery(ALL_AUTHORS)

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  const options = result?.data?.allAuthors.map((option) => {
    return {
      value: option.name.toLowerCase(),
      label: option.name
    }
  })

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BirthYear options={options} />
    </div>
  )
}

export default Authors
