import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('ahhhhhhh', response.data)
  return response.data
}

export default { getAll }