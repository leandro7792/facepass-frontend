import {
  Heading,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Box,
  Text,
  Center
} from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react'
// import useSWR from 'swr'
// import api from '../../services/api'

// const fetcher = (url: string) => api.delete(url).then(resp => resp.data)

function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" height="180px" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  )
}

const Dashboard: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  setTimeout(() => setIsLoaded(true), 2000)
  // const { data, error } = useSWR('entities/777', fetcher)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <Skeleton isLoaded={isLoaded} mb="0.5em">
        <Center>
          <Heading size="lg" mb="0.5em">
            Plataforma de Administração
          </Heading>
        </Center>
      </Skeleton>

      <SimpleGrid minChildWidth="120px" spacing="1em">
        <Skeleton isLoaded={isLoaded}>
          <Feature
            title="Clubes"
            desc="Administre os clubes cadastrados na plataforma"
          />
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Feature title="Totens" desc="Verificar o status dos equipamentos" />
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Feature
            title="Associados"
            desc="Verifique o cadastro global de todos associados"
          />
        </Skeleton>
      </SimpleGrid>

      <SkeletonText mt="4" noOfLines={8} spacing="4" isLoaded={isLoaded} />
    </>
  )
}

export default Dashboard
