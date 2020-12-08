import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import Route from 'next/router'
import { CookieAuth } from './cookie'

const FrontendUnprotected = ['/']
const BackendUnprotected = ['auth']

const redirect = async () => {
  CookieAuth.remove()
  await Route.replace('/?redirect=true')
}

axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const userToken = CookieAuth.get()

    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken.jwt}`
    } else if (!FrontendUnprotected.includes(Route.pathname)) {
      await redirect()
      throw new Error()
    }

    config.baseURL =
      process.env.NODE_ENV === 'production'
        ? 'https://momentum.letmein.com.br/facepass'
        : 'http://192.168.0.168:3334'

    return config
  },
  async (error: AxiosError) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError): Promise<AxiosError> => {
    const authFail = error?.response?.status === 401
    const isProtectedRouteApi = !BackendUnprotected.includes(
      error.response.config.url
    )

    if (authFail && isProtectedRouteApi) {
      await redirect()
    }

    return Promise.reject(error)
  }
)

export default axios
