import { Box, ChakraProvider } from '@chakra-ui/react';
import { Header } from './components/Header';
import { AuthProvider } from './Context/AuthContext';
import { AppRoutes } from './Routes/AppRoutes';
import theme from './themes/theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Box minH={'calc(100vh - 65px)'} bg="#d7dee4">
          <AppRoutes />
        </Box>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
