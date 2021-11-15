import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSign } from '../../services/auth';
import { postLogin } from '../../services/fetcher';

export const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useSign();
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const submit = (): void => {
    postLogin(name, pass)
      .then((response) => {
        signIn({ name, role: response.r, token: response.t });
        return navigate('/');
      })
      .catch(() => setError(`Ошибка`));
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
        <Stack align="center">
          <Heading fontSize="4xl">Авторизация</Heading>
        </Stack>
        <Box rounded="lg" bg={useColorModeValue('white', 'gray.700')} boxShadow="lg" p={8}>
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Имя пользователя</FormLabel>
              <Input
                type="text"
                placeholder="Имя пользователя"
                value={name}
                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                  setName(event.target.value);
                }}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <InputGroup size="md">
                <Input
                  type={show ? 'text' : 'password'}
                  placeholder="********"
                  value={pass}
                  onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                    setPass(event.target.value);
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                    {show ? 'Скрыть' : 'Показать'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack direction={{ base: 'column', sm: 'row' }} align="start" justify="space-between">
                <Text color="red.400">{error}</Text>
              </Stack>
              <Button
                bg="blue.400"
                color="white"
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => submit()}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
