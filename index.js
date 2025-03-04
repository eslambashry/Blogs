import express from "express"

import { connectDB } from "./database/conniction.js"
import CustomError from "./src/utilities/Error.js"
import userRoutes from "./src/modules/auth/auth.routes.js"

import { config } from 'dotenv'

import path from 'path'
import blogroutes from "./src/modules/Blogs/blogs.routes.js"

config({path: path.resolve('./config/.env')})


const app = express()
const port = process.env.PORT 

app.use(express.json())

connectDB()

app.get("/",(req, res) => res.send('Backend is Working 🍌'))

app.use('/users',userRoutes)
app.use('/blogs',blogroutes)




app.use("*",(req,res,next)=>{
   next(new CustomError("URL not found",404))
})

app.use((err, req, res, next) => {
   if (res.headersSent) {
       return next(err);
   }
   res.status(err.statusCode || 500).json({
       status: err.status || 'error',
       message: err.message
   });
});



app.listen(port, () => console.log(`Example app listening on port ${port} 👋`)) 