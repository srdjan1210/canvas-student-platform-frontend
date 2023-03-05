import './App.css';
import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <Flex
      width='100%'
      maxH='100vh'
      height='100vh'
      overflowY='scroll'
      alignItems={'center'}>
      <Outlet />
      <ToastContainer />
    </Flex>
  );
}

export default App;
