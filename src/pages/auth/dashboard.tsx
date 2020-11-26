import {
  Heading,
  Skeleton,
  SimpleGrid,
  Box,
  Text,
  useToken,
  Flex
} from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import animationData from '../../../public/images/lf20_Sb1gLg.json'
import lottie from 'lottie-web'
// import useSWR from 'swr'
// import api from '../../services/api'

// const fetcher = (url: string) => api.delete(url).then(resp => resp.data)
const MotionBox = motion.custom(Box)

function Feature({ title, desc, href, ...rest }) {
  const [blue700] = useToken('colors', ['blue.700'])

  return (
    <Link href={href}>
      <MotionBox
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.99 }}
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
  const refLottie = useRef()

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)

      lottie.loadAnimation({
        container: refLottie.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData
      })
    }, 1000)
  }, [])

  // const { data, error } = useSWR('entities/777', fetcher)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      {/* <Skeleton isLoaded={isLoaded} mb="0.5em">
        <Center>
          <Heading size="lg" mb="0.5em">
            Plataforma de Administração
          </Heading>
        </Center>
      </Skeleton> */}

      <Skeleton isLoaded={isLoaded}>
        <SimpleGrid
          minChildWidth="12em"
          spacing="1em"
          mb="1em"
          gridGap={4}
          justifyContent="space-around"
        >
          <MotionBox
            whileHover={{ scale: 1.04 }}
            shadow="md"
            borderWidth="1px"
            padding="1.1em"
            minHeight="12em"
            display="flex"
            justifyContent="center"
          ></MotionBox>

          <MotionBox whileHover={{ scale: 1.04 }} shadow="md" borderWidth="1px">
            <Box width="250px" height="250px" ref={refLottie} />
          </MotionBox>
        </SimpleGrid>
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
            href="/auth/associates"
          />
        </Skeleton>
      </SimpleGrid>
    </>
  )
}

export default Dashboard
