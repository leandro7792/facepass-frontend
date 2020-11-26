import {
  Box,
  VStack,
  Center,
  SlideFade,
  useDisclosure,
  Heading,
  Text
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import useSWR from 'swr'
import api from '../../services/api'

const fetcher = (url: string) => api.delete(url).then(resp => resp.data)

const Dashboard: React.FC = () => {
  const { isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    setTimeout(onOpen, 200)
  }, [])

  // const { data, error } = useSWR('entities/777', fetcher)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>

  return (
    <>
      <h1>clubs</h1>
    </>
  )
}
export default Dashboard
