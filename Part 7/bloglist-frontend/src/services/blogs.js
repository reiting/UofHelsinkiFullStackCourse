import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const update = (id, newObject) => {
  const response = axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('dlete response', response)
  return response.data
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment, config,)
  return response.data
}

export default { getAll, create, update, setToken, remove, addComment }
