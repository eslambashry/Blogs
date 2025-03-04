import { Router } from "express";
import * as BlogCon from "./blogs.controller.js"
import { multerCloudFunction } from "../../services/multerCloudFunction.js";
import { allowedExtensions } from "../../utilities/allowedExtensions.js";
 
const blogroutes = Router()

blogroutes.get("/",BlogCon.getAllBlogs)

blogroutes.post("/create",multerCloudFunction(allowedExtensions.Image).single('image'),BlogCon.createBlog)

export default blogroutes