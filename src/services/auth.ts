import Route from 'next/router'
import api from './api'
import { CookieAuth } from './cookie'

interface IAuthenticate {
  username: string
  password: string
}

interface IResponse {
  username: string
  jwt: string
}

export const authenticate = async ({
  username,
  password
}: IAuthenticate): Promise<IResponse> => {
  const { data } = await api.post<IResponse>('auth', {
    username,
    password
  })

  CookieAuth.set(data)

  return data
}

export const logoff = (): void => {
  CookieAuth.remove()
  Route.push('/')
}
