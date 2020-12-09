import {
  Skeleton,
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Stack,
  VStack
} from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import useSWR, { useSWRInfinite } from 'swr'

import api from '../../services/api'
import { useState } from 'react'

const fetcher = (url: string) => api.get(url).then(resp => resp.data)

const MotionBox = motion.custom(Flex)

interface IAssociate {
  id: number
  name: string
  cardNumber: string
  faceFilename: string | null
  updatedAt: Date
}

interface ResponseApi {
  data: IAssociate[]
  params: {
    // eslint-disable-next-line camelcase
    total_records: number
    skip: number
    take: number
    order: number
  }
  nextPage: string
}

const getKey = (pageIndex, previousPageData) => {
  console.log(previousPageData)

  // reached the end
  if (previousPageData && previousPageData.nextPage === null) return null

  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return '/entities'

  // add the cursor to the API endpoint
  return previousPageData.nextPage
}

const Associates: React.FC = () => {
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher)
  if (!data) return <h1>loading</h1>

  // We can now calculate the number of all users
  // let totalUsers = 0
  // for (let i = 0; i < data.length; i++) {
  //   totalUsers += data[i].length
  // }

  return (
    <h1>
      <Head>
        <title>Momentum - Associados</title>
      </Head>
      <Heading>Associados</Heading>

      <div>
        <p>#### users listed</p>

        {data.map(page =>
          page.data.map(({ id, name, faceFilename, cardNumber }) => (
            <MotionBox
              key={id}
              whileHover={{ scale: 1.02 }}
              shadow="md"
              borderWidth="1px"
              padding="1em"
              flexWrap="wrap"
            >
              <Box display="flex" justifyContent="center">
                <Box>
                  <Image
                    boxSize="96px"
                    src={faceFilename}
                    alt={name}
                    fallbackSrc="https://via.placeholder.com/96"
                  />
                </Box>
              </Box>
              <Box
                flex="1"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="2xl">{cardNumber}</Text>
              </Box>
              <Box flex="3" display="flex" alignItems="center">
                <Text fontSize="2xl">{name}</Text>
              </Box>
            </MotionBox>
          ))
        )}
        {/* {data.map((users, index) => {
          // `data` is an array of each page's API response.
          return users.map(user => <div key={user.id}>{user.name}</div>)
        })} */}
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </div>
    </h1>
  )

  // const [url, setUrl] = useState('/entities')
  // const { data, error } = useSWR<ResponseApi, unknown>(url, fetcher)
  // if (error) return <div>failed to load</div>
  // if (!data) {
  //   return (
  //     <Stack>
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //       <Skeleton height="96px" />
  //     </Stack>
  //   )
  // }
  // return (
  //   <>
  //     <Head>
  //       <title>Momentum - Associados</title>
  //     </Head>
  //     <Heading>Associados</Heading>
  //     <VStack spacing={4} align="stretch" borderWidth="1px" padding="1.1em">
  //       {data.data.map(({ id, name, faceFilename, cardNumber }) => (
  //         <MotionBox
  //           key={id}
  //           whileHover={{ scale: 1.02 }}
  //           shadow="md"
  //           borderWidth="1px"
  //           padding="1em"
  //           flexWrap="wrap"
  //         >
  //           <Box display="flex" justifyContent="center">
  //             <Box>
  //               <Image
  //                 boxSize="96px"
  //                 src={faceFilename}
  //                 alt={name}
  //                 fallbackSrc="https://via.placeholder.com/96"
  //               />
  //             </Box>
  //           </Box>
  //           <Box
  //             flex="1"
  //             display="flex"
  //             alignItems="center"
  //             justifyContent="center"
  //           >
  //             <Text fontSize="2xl">{cardNumber}</Text>
  //           </Box>
  //           <Box flex="3" display="flex" alignItems="center">
  //             <Text fontSize="2xl">{name}</Text>
  //           </Box>
  //         </MotionBox>
  //       ))}
  //     </VStack>
  //   </>
  // )
}

export default Associates
