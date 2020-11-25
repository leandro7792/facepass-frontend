import {
  Heading,
  Skeleton,
  SkeletonText,
  SimpleGrid,
  Box,
  Text,
  Center,
  useToken
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
// import useSWR from 'swr'
// import api from '../../services/api'

// const fetcher = (url: string) => api.delete(url).then(resp => resp.data)
const MotionBox = motion.custom(Box)

function Feature({ title, desc, href, ...rest }) {
  const [blue500, gray100] = useToken('colors', ['blue.500', 'gray.100'])
  return (
    <Link href={href}>
      <MotionBox
        whileHover={{ scale: 1.05, backgroundColor: blue500, color: gray100 }}
        whileTap={{ scale: 0.95 }}
        p={5}
        shadow="md"
        minH="12em"
        borderWidth="1px"
        cursor="pointer"
        {...rest}
      >
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </MotionBox>
    </Link>
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

      <SimpleGrid minChildWidth="12em" spacing="1em">
        <Skeleton isLoaded={isLoaded}>
          <Feature
            title="Clubes"
            desc="Administre os clubes cadastrados na plataforma"
            href="/auth/clubs"
          />
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Feature
            title="Totens"
            desc="Verificar o status dos equipamentos"
            href="/auth/totens"
          />
        </Skeleton>
        <Skeleton isLoaded={isLoaded}>
          <Feature
            title="Associados"
            desc="Verifique o cadastro global de todos associados"
            href="/auth/associated"
          />
        </Skeleton>
      </SimpleGrid>

      <SkeletonText mt="4" noOfLines={8} spacing="4" isLoaded={isLoaded} />
    </>
  )
}

export default Dashboard
