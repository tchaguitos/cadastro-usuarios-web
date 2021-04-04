import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL

const getProfile = async () => {
  let token = localStorage.getItem('token')

  const options = {
    url: `${ BASE_URL }/v1/perfil/`,
    crossDomain: true,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios(options)
    .then(res => res)
    .catch(err => err.response)
  
  return response
}

const updateProfile = async data => {
  let token = localStorage.getItem('token')

  const options = {
    url: `${ BASE_URL }/v1/perfil/`,
    crossDomain: true,
    method: 'PUT',
    data: data,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const response = await axios(options)
    .then(res => res)
    .catch(err => err.response)
  
  return response
}

export {
  getProfile,
  updateProfile
}
