export class ProfessorRegistrationDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
        public readonly name: string,
        public readonly surname: string,
        public readonly title: string
    ) {}
}
