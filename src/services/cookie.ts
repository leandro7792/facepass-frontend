import Cookie from 'js-cookie'

interface ICookieAuth {
  username: string
  jwt: string
}

export const cookieAuthName = 'authToken'

export const CookieAuth = {
  get: (): ICookieAuth => {
    const data = Cookie.get(cookieAuthName)
    return data ? JSON.parse(data) : null
  },
  set: (data: ICookieAuth): void => {
    Cookie.set(cookieAuthName, JSON.stringify(data), { expires: 1 })
  },
  remove: (): void => {
    try {
      Cookie.remove(cookieAuthName)
    } catch (error) {
      console.info('no cookie')
    }
  }
}
