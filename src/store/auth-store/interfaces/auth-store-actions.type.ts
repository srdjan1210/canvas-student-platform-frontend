import { LoginDto } from '../dtos/login.dto'
import { ProfessorRegistrationDto } from '../dtos/professor-registration.dto'

export type AuthStoreActions = {
    login: (dto: LoginDto) => void
    logout: () => void
    registerProfessor: (dto: ProfessorRegistrationDto) => void
}
