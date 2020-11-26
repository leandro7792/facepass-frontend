import Route from 'next/router'
import api from './api'
import { CookieAuth, cookieAuthName } from './cookie'
import cookie from 'cookie'
import { GetServerSideProps } from 'next'

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

export const authenticateServerSide: GetServerSideProps = async context => {
  const cookies = cookie.parse(context.req.headers.cookie)

  if (cookies[cookieAuthName]) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }

  return {
    props: {}
  }
}

export const logoff = (): void => {
  CookieAuth.remove()
  Route.push('/')
}
