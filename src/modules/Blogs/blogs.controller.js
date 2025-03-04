import { customAlphabet } from 'nanoid'
import { Blog } from '../../../database/models/blogs.js'
import catchError from '../../middleware/ErrorHandeling.js'
// import imagekit, { destroyImage } from "../../utilities/imagekitConfigration.js"
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5)

// =========================== create ===============================
export const createBlog = catchError(async(req,res,next) => {
  const { title, description, Keywords } = req.body
    
     if (!req.file) {
        return next(new CustomError('Please upload Blog image',  400 ))
    }

    const customId = nanoid()
 
        const uploadResult = await imagekit.upload({
          file: req.file.buffer, 
          fileName: req.file.originalname,  
          folder: `${process.env.PROJECT_FOLDER}/Blogs/${customId}`, 
        });
     
        if (!uploadResult) {
          return next(new CustomError('Failed to upload image',  400 ))
        }
        const blogObject = {
          title,
          description, 
          Keywords,
          customId,
          Image: {
            secure_url: uploadResult.url,       // image url that frontend can access the image 
            public_id: uploadResult.fileId,  // image path on imagekit website
          },
        };

        const blog = await Blog.create(blogObject);
   
        if (!blog) {
           await destroyImage(blog.Image.public_id);
           return next(new CustomError('Try again later, failed to add',  400 ))
        }

    
        res.status(200).json({ message: 'Blog added successfully', blog });
})


// =========================== get all ===============================

export const getAllBlogs = catchError(async(req,res,next) => {

  const blogs = await Blog.find()
  
  if(!blogs) return next(new CustomError('No Blogs Found',  400 ))


    const num = blogs.length
    res.status(201).json({message:`Blogs Number : ${num}`,blogs})
})