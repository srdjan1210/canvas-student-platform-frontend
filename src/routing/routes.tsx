import { RouteObject } from 'react-router-dom'
import App from '../App'
import { LoginPage } from '../auth/pages/login.page'
import { RegistrationPage } from '../auth/pages/registration.page'
import { Dashboard } from '../dashboad/pages/dashboard.page'

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        path: 'registration',
                        element: <RegistrationPage />,
                    },
                ],
            },
        ],
    },
]
