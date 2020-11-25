import { Center, Text, Link } from '@chakra-ui/react'
import Image from 'next/image'

const MyFooter: React.FC = () => {
  return (
    <Center as="footer" paddingY="1.5em">
      <Text fontWeight="900" fontStyle="italic">
        Powered by
      </Text>
      <Link href="http://letmein.com.br/" isExternal>
        <Image src="/images/logo-dark.png" width={102} height={27} />
      </Link>
    </Center>
  )
}
export default MyFooter
