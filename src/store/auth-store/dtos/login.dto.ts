export class LoginDto {
    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }
}