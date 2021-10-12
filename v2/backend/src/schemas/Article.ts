import { ObjectId } from 'mongodb'

export default class Article {
    constructor(
        public title: string,
        public description: string,
        public heroImgUrl: string,
        created: {
            type: Date,
            default: ObjectId["getTimestamp"]
        },
        comments: string[],
        tags: string[],
        public id?: ObjectId,
    ) { }
}