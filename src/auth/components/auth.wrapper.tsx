import { Children } from '../../shared/types'
import { useApplicationStore } from '../../store/application.store'
import { Navigate } from 'react-router-dom'

interface Props {
    children: any
    roles: string[]
}

export const AuthWrapper = ({ children, roles }: Props) => {
    const user = useApplicationStore((state) => state.user)
    const token = useApplicationStore((state) => state.token)

    console.log(!token)
    if (!token) return <Navigate to={'/login'} />
    if (roles.includes(user?.role ?? '')) {
        return children
    }

    console.log(user, token)
    return <Navigate to={'/dashboard'} />
}
