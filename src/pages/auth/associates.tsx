import { GetServerSideProps } from 'next'
import Head from 'next/head'
// import { cookieAuthName } from '../../services/cookie'
// import cookie from 'cookie'

const Associates: React.FC = () => {
  return (
    <>
      <Head>
        <title>Momentum - Associados</title>
      </Head>

      <h1>eae</h1>
    </>
  )
}

export default Associates

// export const getServerSideProps: GetServerSideProps = async context => {
//   // const cookies = cookie.parse(context.req.headers.cookie)
//   // if (!cookies[cookieAuthName]) {
//   //   return {
//   //     redirect: {
//   //       destination: '/'
//   //     }
//   //   }
//   // }
//   // return {
//   //   props: {}
//   // }
// }
