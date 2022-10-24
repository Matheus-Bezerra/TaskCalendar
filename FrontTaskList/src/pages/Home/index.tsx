import { Flex, Button, Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useState } from 'react';
import { Input } from '../../components/form/Input';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

type SignInFormData = {
  name: string;
};

const signInSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(2, 'Nome deve conter no mínimo 3 dígitos')
    .max(30, 'O campo deve conter no máximo 30 dígitos'),
});

export function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInSchema),
  });
  const errors = formState.errors;
  const { setUser } = useContext(AuthContext);

  async function handleSignIn(values: SignInFormData) {
    try {
      setLoading(true);
      setUser({ name: values.name });
      sessionStorage.setItem('user@dielTask', values.name);
      navigate('/task');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Flex h="80vh" alignItems="center" justifyContent="center">
        <Flex
          as="form"
          flexDirection="column"
          width="100%"
          maxWidth={360}
          bg="white"
          p="8"
          borderRadius={8}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              id="name"
              placeholder="Nome"
              {...register('name')}
              error={errors.name}
            />

            <Button
              type="submit"
              mt="6"
              colorScheme="twitter"
              size="lg"
              isLoading={formState.isSubmitting}
              cursor={loading ? 'progress' : 'default'}
              disabled={loading}
              _disabled={{
                bg: 'twitter.500',
                cursor: 'progress',
              }}
            >
              Entrar
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}
