import { Box, VStack, SlideFade, useDisclosure } from '@chakra-ui/react'
import { useEffect } from 'react'

import MyHeader from './header'
import MyFooter from './footer'

const Main: React.FC = ({ children }) => {
  const { isOpen, onOpen } = useDisclosure()

  useEffect(() => {
    setTimeout(onOpen, 200)
  }, [])

  return (
    <Box>
      <Box
        bg="blue.600"
        height="55vh"
        width="100%"
        position="absolute"
        zIndex="-1"
      ></Box>
      <VStack
        marginX={['0.5em', '2.5em', '4em', '7em']}
        align="stretch"
        minH="100vh"
      >
        <MyHeader />

        <SlideFade in={isOpen} offsetY={30}>
          <Box
            as="main"
            bg="white"
            boxShadow="2xl"
            borderRadius="sm"
            padding="1em"
            minH="70vh"
          >
            {children}
          </Box>
          <MyFooter />
        </SlideFade>
      </VStack>
    </Box>
  )
}

export default Main
