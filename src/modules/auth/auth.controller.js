import pkg from 'bcrypt'
import { userModel } from '../../../database/models/user.js'
import jwt from "jsonwebtoken";
import catchError from '../../middleware/ErrorHandeling.js';
import CustomError from '../../utilities/Error.js';

export const signUp = catchError(async(req,res,next) => { 
    const {
        username,
        email,
        password,
    } = req.body

    const isEmailExisted = await userModel.findOne({email})

    if(isEmailExisted){
        return next(new CustomError('Email Is Already Exsist',  400 ))
    }

    const user = new userModel({
        username,
        email,
        password,
      })
      
      if(!user){
        return next(new CustomError('Data Not Found',  400 ))
      }
      const saveUser = await user.save()

      res.status(201).json({message:'User Added successfully', saveUser})
    })  
    

export const login = catchError(async(req,res,next) => {
    const {email,password} = req.body


    const userExsist = await userModel.findOne({email})
    if(!userExsist){
        return next(new CustomError('in correct email',  400 ))
    }

    
     const passwordExsist = pkg.compareSync(password, userExsist.password);
 
    
    
    if(!passwordExsist){
        return next(new CustomError('in correct password',  400 ))
    }

    let token = jwt.sign({ _id: userExsist._id }, process.env.SIGN_IN_TOKEN_SECRET)


     const userUpdated = await userModel.findOneAndUpdate({email}, {token}, {new:true})
     if(!userUpdated){
        return next(new CustomError('User Not Found',  400 ))
     }
     res.status(200).json({message: 'Login Success', userUpdated})
})
