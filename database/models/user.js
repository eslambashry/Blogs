import { Schema,model } from "mongoose"
import pkg from 'bcrypt'

const userSchema = new Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    // role:{
    //     type:String,
    //     required:true,
    //     enum:[systemRoles.ADMIN,systemRoles.SUPER_ADMIN]
    // },

    
    token:String,
},{timestamps:true})

    userSchema.pre('save',function(){
        this.password = pkg.hashSync(this.password, +process.env.SALT_ROUNDS)
    })

export const userModel = model('User', userSchema)

