import axios from 'axios'
import { BASE_URL } from '../constants'

const getAllCities = async () => {
  const options = {
    url: `${ BASE_URL }/v1/cidades/`,
    crossDomain: true,
    method: 'GET'
  }
  
  const response = await axios(options)
    .then(res => res)
    .catch(err => err.response)

  return response
}

export {
  getAllCities
}
