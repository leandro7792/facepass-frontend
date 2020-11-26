import {
  Flex,
  Spacer,
  Box,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  StackDivider
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import NextLink from 'next/link'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'

const MyHeader: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', onClose)

    return () => {
      router.events.off('routeChangeStart', onClose)
    }
  }, [])

  return (
    <>
      <Flex as="header" marginY="1.5em">
        <Box>
          <Image src="/images/logo-momentum.png" width={220} height={30} />
        </Box>

        <Spacer />

        <Box>
          <IconButton
            aria-label="Menu"
            icon={<HamburgerIcon />}
            ref={btnRef}
            onClick={onOpen}
          ></IconButton>
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>

            <DrawerBody>
              <VStack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
              >
                <NextLink href="/auth/dashboard">Início</NextLink>

                <NextLink href="/auth/clubs">Clubes</NextLink>

                <NextLink href="/auth/totens">Totens</NextLink>

                <NextLink href="/auth/associates">Associados</NextLink>
              </VStack>
            </DrawerBody>

            <DrawerFooter>
              Colocar grupo de botoes (sair e settings)
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MyHeader
