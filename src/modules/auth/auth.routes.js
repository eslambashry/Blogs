import Router from "express"
import { signUp,login } from "./auth.controller.js"

const userRoutes = Router()

userRoutes.post("/signUp",signUp)
userRoutes.post("/login",login)

export default userRoutes 