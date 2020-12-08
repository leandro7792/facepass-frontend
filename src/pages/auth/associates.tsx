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
import useSWR from 'swr'

import api from '../../services/api'

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

const Associates: React.FC = () => {
  const { data, error } = useSWR<ResponseApi, unknown>('/entities', fetcher)

  if (error) return <div>failed to load</div>

  if (!data) {
    return (
      <Stack>
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
        <Skeleton height="96px" />
      </Stack>
    )
  }

  return (
    <>
      <Head>
        <title>Momentum - Associados</title>
      </Head>

      <Heading>Associados</Heading>

      <VStack spacing={4} align="stretch" borderWidth="1px" padding="1.1em">
        {data.data.map(({ id, name, faceFilename, cardNumber }) => (
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
        ))}
      </VStack>
    </>
  )
}

export default Associates
