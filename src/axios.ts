import axios from 'axios'
import { baseURI } from './config/config'

const api = axios.create({
  baseURL: baseURI,
})
axios.defaults.withCredentials = true
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // config['headers']['Authorization'] =
    //   'Bearer ' + localStorage.getItem('token')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (res) {
    try {
      // this will be added after encryption
      // const decryptedRes = responseGenerator(res.data.res)
      // const decryptedRes = res.data.res
      return res.data
    } catch (err) {
      console.log('error', err)
    }
  },
  function (error) {
    const originalRequest = error.config
    console.log('error', error)
    // *** Manage unauthorize error here *** //
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   store.dispatch(userLogout());
    //   store.dispatch(
    //     setMessage(
    //       getToastPayload("Please login again , session time out", warning)
    //     )
    //   );
    // }
    return Promise.reject(error)
  }
)

export default api
