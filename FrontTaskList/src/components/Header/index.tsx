import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import DielIcon from '../../assets/Dielicon.svg';
import { AuthContext } from '../../Context/AuthContext';

export const Header = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    sessionStorage.removeItem('user@dielTask');
    setUser({ name: '' });
  }, []);

  return (
    <Flex
      px={[4, 6, 12]}
      maxH="65px"
      align="center"
      justify={'space-between'}
      gap={10}
    >
      <Link
        href="/"
        textDecoration={'none'}
        _hover={{ textDecoration: 'none' }}
      >
        {' '}
        <Flex as="h1" fontSize="4xl" py={4}>
          <img src={DielIcon} alt="" width={'125px'} /> .
        </Flex>
      </Link>
      {user.name && (
        <Box>
          <Text as="p">
            Seja bem vindo,{' '}
            <Text as="span" fontWeight="bold">
              {String(user.name)}{' '}
            </Text>
            <Link
              href="/"
              textDecoration={'none'}
              _hover={{ textDecoration: 'none' }}
              fontSize={'sm'}
            >
              (sair)
            </Link>
          </Text>
        </Box>
      )}
    </Flex>
  );
};
