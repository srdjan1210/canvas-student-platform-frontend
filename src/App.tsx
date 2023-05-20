import './App.css'
import { Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useApplicationStore } from './store/application.store'
import { GlobalSpinner } from './shared/components/spinner.component'

function App() {
    const spinner = useApplicationStore((state) => state.spinner)
    return (
        <Flex
            width="100%"
            maxH="100vh"
            height="100vh"
            overflowY="hidden"
            alignItems={'center'}
            position={'relative'}
        >
            <Outlet />
            <ToastContainer />
            <GlobalSpinner spinner={spinner} />
        </Flex>
    )
}

export default App
