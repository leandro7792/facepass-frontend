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
  Box,
  useToast
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import FrmControl from '../components/FormControlDark'

const Home: React.FC = () => {
  const { isOpen, onOpen } = useDisclosure()
  const { isOpen: isOpenFrm, onOpen: onOpenFrm } = useDisclosure()
  const toast = useToast()

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
                    onSubmit={(values, actions) => {
                      setTimeout(() => {
                        // alert(JSON.stringify(values, null, 2))

                        toast({
                          position: 'top-right',
                          title: 'Erro de autenticação.',
                          description: 'Usuário e/ou senha inválidos',
                          status: 'error',
                          duration: 4000,
                          isClosable: true
                        })

                        actions.setSubmitting(false)
                      }, 1000)
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <FrmControl
                          name="username"
                          label="Usuário"
                          placeholder="meu usuário"
                          helperText="Informe seu usuário de acesso"
                        />

                        <FrmControl
                          name="password"
                          label="Senha"
                          placeholder="******"
                          helperText="Preencha com sua senha"
                        />

                        <Stack>
                          <Button
                            minW="120px"
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
    </Box>
  )
}

export default Home
