import { Heading, Skeleton, SimpleGrid, Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import animationData from '../../../public/images/lf20_Sb1gLg.json'
import lottie from 'lottie-web'
// import useSWR from 'swr'
// import api from '../../services/api'

// const fetcher = (url: string) => api.delete(url).then(resp => resp.data)
const MotionBox = motion.custom(Box)

function Feature({ title, desc, href, ...rest }) {
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

      <SimpleGrid
        minChildWidth="22em"
        spacing="1em"
        mb="1em"
        gridGap={4}
        justifyContent="space-around"
      >
        <Skeleton isLoaded={isLoaded}>
          <MotionBox
            whileHover={{ scale: 1.04 }}
            shadow="md"
            borderWidth="1px"
            padding="1.1em"
            minHeight="12em"
            display="flex"
            justifyContent="center"
          ></MotionBox>
        </Skeleton>

        <Skeleton isLoaded={isLoaded}>
          <MotionBox
            padding="1.1em"
            whileHover={{ scale: 1.04 }}
            shadow="md"
            borderWidth="1px"
          >
            <Box width="160px" height="160px" ref={refLottie} />
          </MotionBox>
        </Skeleton>
      </SimpleGrid>

      <SimpleGrid spacing="1em" columns={2} minChildWidth="18em">
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
