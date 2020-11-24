import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { CookieAuth } from '../services/cookie'

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    const cookieAuth = CookieAuth.get()
    const authRoute = router.pathname.indexOf('/auth/') === 0

    console.log(cookieAuth, authRoute)

    if (!cookieAuth && authRoute) {
      router.push('/')
    }
  }, [])

  return <>{children}</>
}
export default AuthProvider
