import axios from 'axios'
import { BASE_URL } from '../constants'

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

export {
  getProfile
}
