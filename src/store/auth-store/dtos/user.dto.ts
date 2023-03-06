export class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly surname: string,
        public readonly email: string,
        public readonly role: string
    ) {}
}
