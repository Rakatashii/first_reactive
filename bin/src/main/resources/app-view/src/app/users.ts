export class Users {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public enabled: boolean
    ) {}
}