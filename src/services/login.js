import axios from 'axios'
import { BASE_URL } from '../constants'

const login = async (data) => {
  const options = {
    url: `${ BASE_URL }/v1/auth/token/`,
    crossDomain: true,
    method: 'POST',
    data: data,
  }
  
  const response = await axios(options)
    .then(res => res)
    .catch(err => err.response)
  
  return response
}

export {
  login
}
