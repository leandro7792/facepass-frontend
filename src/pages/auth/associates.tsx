import {
  Skeleton,
  SimpleGrid,
  Flex,
  Box,
  Heading,
  Text,
  Image,
  Stack,
  VStack,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { useSWRInfinite } from 'swr'

import api from '../../services/api'
import { useEffect, useMemo, useState } from 'react'
import { CheckIcon, Search2Icon } from '@chakra-ui/icons'
import { Form, Formik, Field } from 'formik'
import * as yup from 'yup'
import FormControl from '../../components/form/FormControlDefault'
import NProgress from 'nprogress'

const fetcher = (url: string) => api.get(url).then(resp => resp.data)

const MotionBox = motion.custom(Flex)

interface IAssociate {
  id: number
  name: string
  cardNumber: string
  faceFilename: string | null
  updatedAt: Date
}

interface ResponseApi {
  data: IAssociate[]
  params: {
    // eslint-disable-next-line camelcase
    total_records: number
    skip: number
    take: number
    order: number
  }
  nextPage: string
}

const Associates: React.FC = () => {
  const [options, setOptions] = useState<string | null>(null)

  const getKey = (pageIndex, previousPageData) => {
    console.log(previousPageData)

    // reached the end
    if (previousPageData && previousPageData.nextPage === null) return null

    // first page, we don't have `previousPageData`
    if (pageIndex === 0) return `/entities?${options}`

    // add the cursor to the API endpoint
    return previousPageData.nextPage
  }

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
    ResponseApi,
    unknown
  >(getKey, fetcher)

  const isLoadingInitialData = useMemo(() => !data && !error, [data, error])

  const isLoadingMore = useMemo(
    () =>
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === 'undefined'),
    [isLoadingInitialData, data, size]
  )

  const isRefreshing = useMemo(
    () => isValidating && data && data.length === size,
    [isValidating, data, size]
  )

  useEffect(() => {
    if (isRefreshing || isLoadingInitialData || isValidating) NProgress.start()
    else NProgress.done()

    return () => {
      NProgress.done()
    }
  }, [isLoadingInitialData, isRefreshing, isValidating])

  return (
    <>
      <Head>
        <title>Momentum - Associados</title>
      </Head>

      <HStack padding="1em" marginBottom="1em" borderWidth="1px">
        <Box flex="1">
          <Heading fontSize="3xl">Associados</Heading>
        </Box>

        <Box>
          <Popover>
            <PopoverTrigger>
              <IconButton
                colorScheme="green"
                aria-label="Ajustes"
                icon={<Search2Icon />}
              />
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Filtros</PopoverHeader>
              <PopoverBody>
                <Formik
                  initialValues={{
                    // take: 10,
                    // skip: 0,
                    // sort: 'name:asc',
                    // photo: null,
                    name: '',
                    cardNumber: '',
                    withImage: '2'
                  }}
                  validationSchema={yup
                    .object({
                      // // take: yup.number().min(1).max(1000).nullable(),
                      // // skip: yup.number().min(0).nullable(),
                      // // sort: yup.string().default('name:asc').nullable(),
                      // // photo: yup.boolean().nullable(),
                      name: yup.string().nullable(),
                      cardNumber: yup.string().nullable(),
                      withImage: yup.number().nullable()
                    })
                    .defined()}
                  onSubmit={async (filters, actions) => {
                    try {
                      // leandro

                      const { name, cardNumber, withImage } = filters

                      let params = ''

                      if (name) params += `name=${name}&`
                      if (cardNumber) params += `cardNumber=${cardNumber}&`
                      if (withImage === '1') params += 'photo=true'
                      if (withImage === '0') params += 'photo=false'
                      // if (withImage === '2') params = params.split('photo')[0]

                      setOptions(params)
                      mutate()
                    } catch (error) {
                      // error
                    } finally {
                      actions.setSubmitting(false)
                    }
                  }}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form>
                      <FormControl
                        name="name"
                        label=""
                        placeholder="Nome"
                        inputType="text"
                        helperText=""
                        disabled={isSubmitting}
                      />

                      <FormControl
                        name="cardNumber"
                        label=""
                        placeholder="Código do Cartão"
                        inputType="text"
                        helperText=""
                        disabled={isSubmitting}
                      />

                      <Field name="withImage">
                        {({ field, form }) => (
                          <RadioGroup
                            onChange={e => setFieldValue('withImage', e)}
                            value={values.withImage}
                            mb="1em"
                          >
                            <Text>Foto</Text>
                            <Stack direction="row">
                              <Radio value="1">com</Radio>
                              <Radio value="0">sem</Radio>
                              <Radio value="2">ambos</Radio>
                            </Stack>
                          </RadioGroup>
                        )}
                      </Field>

                      <Flex direction="row-reverse">
                        <Button
                          isLoading={isSubmitting}
                          type="submit"
                          rightIcon={<CheckIcon />}
                          size="md"
                          borderColor="gray.300"
                        >
                          Filtrar
                        </Button>
                      </Flex>
                    </Form>
                  )}
                </Formik>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      </HStack>

      <VStack spacing={1} align="stretch" borderWidth="1px" padding="1em">
        <MotionBox marginBottom="4px">
          <Box width="72px" textAlign="center">
            <Heading fontSize="xl">Foto</Heading>
          </Box>
          <Box
            flex="1"
            marginX="0.4em"
            maxWidth="220px"
            minWidth="110px"
            textAlign="center"
          >
            <Heading fontSize="xl">Cartão</Heading>
          </Box>
          <Box bg="blue" flex="3">
            <Heading fontSize="xl">Nome</Heading>
          </Box>
        </MotionBox>

        {isLoadingInitialData && (
          <Stack>
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
            <Skeleton height="72px" />
          </Stack>
        )}

        {!isLoadingInitialData &&
          data.map(page =>
            page.data.map(({ id, name, faceFilename, cardNumber }) => (
              <MotionBox
                key={id}
                whileHover={{ scale: 1.02, borderColor: 'gray' }}
                shadow="md"
                borderWidth="1px"
                padding="0.4em"
                flexWrap="wrap"
              >
                <Box display="flex" justifyContent="center">
                  <Box>
                    <Image
                      boxSize="64px"
                      src={faceFilename}
                      alt={name}
                      fallbackSrc="https://via.placeholder.com/72"
                    />
                  </Box>
                </Box>
                <Box
                  flex="1"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  marginX="0.4em"
                  maxWidth="220px"
                  minWidth="110px"
                >
                  <Text fontSize="xl">{cardNumber}</Text>
                </Box>
                <Box
                  flex="3"
                  display="flex"
                  alignItems="center"
                  marginTop={['1em', 0]}
                >
                  <Text fontSize="xl">{name}</Text>
                </Box>
              </MotionBox>
            ))
          )}

        <Box>
          <Button
            colorScheme="green"
            isLoading={isLoadingMore}
            type="button"
            marginTop="2em"
            width="100%"
            height="50px"
            onClick={() => setSize(size + 1)}
          >
            Carregar mais
          </Button>
        </Box>
      </VStack>
    </>
  )
}

export default Associates
