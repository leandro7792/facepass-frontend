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
  Button,
  Stack,
  useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { AxiosError } from 'axios'

import FrmControl from '../components/form/FormControlDark'
import { authenticate } from '../services/auth'

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenFrm, onOpen: onOpenFrm } = useDisclosure()
  const toast = useToast()

  useEffect(() => {
    onOpen()

    setTimeout(onOpenFrm, 600)

    const handleChangePage = () => onClose()

    Router.events.on('routeChangeStart', handleChangePage)

    return () => {
      Router.events.off('routeChangeStart', handleChangePage)
    }
  }, [])

  return (
    <>
      <Head>
        <title>LetMeIn - Momentum</title>
      </Head>

      <ScaleFade initialScale={0.9} in={isOpen}>
        <Flex minH="100vh">
          <SimpleGrid
            as="main"
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
              {/* <Image src="/images/facepass-logo.png" width={315} height={175} /> */}
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

                  <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={yup
                      .object({
                        username: yup
                          .string()
                          .required('Campo obrigatório')
                          .min(3, 'Digite ao menos 3 caracteres'),
                        password: yup
                          .string()
                          .required('Campo obrigatório')
                          .min(3, 'Digite ao menos 3 caracteres')
                      })
                      .defined()}
                    onSubmit={async ({ username, password }, actions) => {
                      try {
                        await authenticate({ username, password })

                        toast({
                          position: 'top-right',
                          title: `Bem vindo ${username}`,
                          status: 'success',
                          duration: 3000,
                          isClosable: true
                        })

                        Router.push('/auth/dashboard')
                      } catch (error) {
                        if (error.isAxiosError) {
                          const err = error as AxiosError

                          if (err.response.status === 401) {
                            toast({
                              position: 'top-right',
                              title: 'Erro de autenticação.',
                              description: 'Usuário e/ou senha inválido(s)',
                              status: 'error',
                              duration: 3000,
                              isClosable: true
                            })
                          }
                        }

                        actions.setSubmitting(false)
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <FrmControl
                          name="username"
                          label="Usuário"
                          placeholder="meu usuário"
                          inputType="text"
                          helperText="Informe seu usuário de acesso"
                          disabled={isSubmitting}
                        />

                        <FrmControl
                          name="password"
                          label="Senha"
                          placeholder="******"
                          inputType="password"
                          helperText="Preencha com sua senha"
                          disabled={isSubmitting}
                        />

                        <Stack>
                          <Button
                            colorScheme="green"
                            isLoading={isSubmitting}
                            type="submit"
                          >
                            Entrar
                          </Button>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </SlideFade>
              </Container>
            </Center>
          </SimpleGrid>
        </Flex>
      </ScaleFade>
    </>
  )
}

export default Home
