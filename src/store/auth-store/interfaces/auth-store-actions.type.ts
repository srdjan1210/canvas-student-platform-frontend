import { LoginDto } from '../dtos/login.dto'
import { User } from '../../../auth/model/user.model'
import { GenericResponseType } from '../../generic-response.type'

export type AuthStoreActions = {
    login: (dto: LoginDto) => Promise<GenericResponseType<any>>
    logout: () => void
    getMe: (token: string) => Promise<GenericResponseType<User>>
    getToken: (dto: LoginDto) => Promise<GenericResponseType<string>>
}
