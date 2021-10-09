import { TokenController } from "./TokenController"
import { UserController } from "./UserController"
import { CommentController } from "./CommentController"
import { ArticleController } from "./ArticleController"

const tokenController = new TokenController()
const userController = new UserController()
const commentController = new CommentController()
const articleController = new ArticleController()

export {
    tokenController,
    userController,
    commentController,
    articleController
}