import axios from 'axios'

const BASE_URL = process.env.VUE_APP_BASE_URL

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
