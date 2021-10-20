import { model } from 'mongoose'
import { Token } from './Token'
import { User } from './User'
import { Comment } from './Comment'
import { Article } from './Article'

const article = model('Article', Article)
const user = model('User', User)
const token = model('Token', Token)
const comment = model('Comment', Comment)

export {
    token as Token,
    user as User,
    comment as Comment,
    article as Article
}