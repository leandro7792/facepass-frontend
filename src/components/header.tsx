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
  StackDivider,
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  SettingsIcon,
  ArrowBackIcon,
  EditIcon
} from '@chakra-ui/icons'
import Image from 'next/image'
import NextLink from 'next/link'
import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import FrmControl from '../components/form/FormControlDefault'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { logoff } from '../services/auth'
import api from '../services/api'

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

  const quit = useCallback(() => {
    logoff()
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
              <ButtonGroup
                colorScheme="gray"
                size="lg"
                isAttached
                variant="outline"
                width="100%"
                justifyContent="center"
              >
                <Popover>
                  <PopoverTrigger>
                    <IconButton
                      borderColor="gray.300"
                      flex="3"
                      aria-label="Ajustes"
                      icon={<SettingsIcon />}
                    />
                  </PopoverTrigger>

                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Alterar Senha</PopoverHeader>
                    <PopoverBody>
                      <Formik
                        initialValues={{
                          currentPass: '',
                          newPass: '',
                          confirmPass: ''
                        }}
                        validationSchema={yup
                          .object({
                            currentPass: yup
                              .string()
                              .required('Por favor preencha'),
                            newPass: yup
                              .string()
                              .required('Por favor preencha')
                              .min(6, 'Digite ao menos 3 caracteres'),
                            confirmPass: yup
                              .string()
                              .required('Por favor preencha')
                              .min(6, 'Digite ao menos 3 caracteres')
                          })
                          .defined()}
                        onSubmit={async (
                          { currentPass, newPass, confirmPass },
                          actions
                        ) => {
                          try {
                            const data = await api.put('auth/password', {
                              oldPassword: currentPass,
                              newPassword: newPass,
                              confirmPassword: confirmPass
                            })

                            alert(JSON.stringify(data.data))
                          } catch (error) {
                            alert(JSON.stringify(error))
                            // code
                          } finally {
                            actions.setSubmitting(false)
                          }
                        }}
                      >
                        {({ isSubmitting }) => (
                          <Form>
                            <FrmControl
                              name="currentPass"
                              label=""
                              placeholder="Senha atual"
                              inputType="text"
                              helperText=""
                              disabled={isSubmitting}
                            />

                            <FrmControl
                              name="newPass"
                              label=""
                              placeholder="Nova senha"
                              inputType="password"
                              helperText=""
                              disabled={isSubmitting}
                            />

                            <FrmControl
                              name="confirmPass"
                              label=""
                              placeholder="Repita a nova senha"
                              inputType="password"
                              helperText=""
                              disabled={isSubmitting}
                            />
                            <Flex direction="row-reverse">
                              <Button
                                isLoading={isSubmitting}
                                type="submit"
                                rightIcon={<EditIcon />}
                                size="md"
                                borderColor="gray.300"
                              >
                                Alterar
                              </Button>
                            </Flex>
                          </Form>
                        )}
                      </Formik>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>

                <Button
                  flex="4"
                  rightIcon={<ArrowBackIcon />}
                  borderColor="gray.300"
                  onClick={quit}
                >
                  Sair
                </Button>
              </ButtonGroup>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default MyHeader
