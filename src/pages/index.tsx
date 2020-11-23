import { useEffect } from 'react'
import {
  SimpleGrid,
  Center,
  Flex,
  SlideFade,
  ScaleFade,
  useDisclosure,
  Text,
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Stack,
  DarkMode,
  Box
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'

// ('')

const Home: React.FC = () => {
  const { isOpen, onOpen } = useDisclosure()
  const { isOpen: isOpenFrm, onOpen: onOpenFrm } = useDisclosure()

  useEffect(() => {
    setTimeout(onOpen, 200)
    setTimeout(onOpenFrm, 600)
  }, [])

  return (
    <Box bg="gray.300">
      <Head>
        <title>LetMeIn - Momentum</title>
      </Head>

      <ScaleFade initialScale={0.9} in={isOpen}>
        <Flex minH="100vh">
          <SimpleGrid
            as="main"
            borderWidth="1px"
            borderRadius="sm"
            margin={['2em', '2.5em', '3.5em', '4em']}
            columns={[1, 1, 2]}
            flex={1}
            boxShadow="2xl"
          >
            <Center
              display={['none', 'none', 'flex']}
              flexDirection="column"
              padding="1em"
              bg="white"
            >
              <Text mb={2}>Powered by</Text>
              <Image src="/images/celebro-light.png" width={180} height={150} />
              <Image src="/images/logo-frase.png" width={300} height={90} />
            </Center>

            <Center bg="blue.600">
              <Container color="white">
                <SlideFade in={isOpenFrm} offsetY={30}>
                  <Image
                    src="/images/logo-momentum.png"
                    width={220}
                    height={30}
                  />
                  <FormControl id="username" mt="1.5em" isRequired>
                    <FormLabel>Usuário</FormLabel>
                    <Input type="text" max={20} placeholder="username" />

                    <FormHelperText fontStyle="italic" color="whitesmoke">
                      Informe seu usuário de acesso
                    </FormHelperText>
                  </FormControl>

                  <FormControl id="password" my="1.5em" isRequired>
                    <FormLabel>Senha</FormLabel>
                    <Input type="password" max={20} placeholder="*********" />
                    <FormHelperText fontStyle="italic" color="whitesmoke">
                      Preencha com sua senha
                    </FormHelperText>

                    <FormErrorMessage>Teste teste teste</FormErrorMessage>
                  </FormControl>

                  <Stack>
                    <Button minW="120px" colorScheme="green">
                      Entrar
                    </Button>
                  </Stack>
                </SlideFade>
              </Container>
            </Center>
          </SimpleGrid>
        </Flex>
      </ScaleFade>
    </Box>
  )
}

export default Home
