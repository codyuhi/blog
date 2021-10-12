import { ObjectId } from 'mongodb'

export default class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public username: string,
        public password: string,
        public role: {
            type: string,
            default: 'user',
            select: false
        }
    ) { }
}

User