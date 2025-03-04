import { model, Schema } from "mongoose";

const blogSchema = Schema({
    title: {
        type:String,
        required:true
      },
      description: {
        type:String,
        required:true
      },
      Keywords: [{ type: String, required: true }], 
      Image: {
          secure_url:{
              type: String,
            required: true,
        },
        public_id: {
            type: String,
            required: true,
        },
    },
    customId:String,
    createdAt: {
        type: Date,
        default: Date.now
    }
    //   author: {
    //     type: Schema.Types.ObjectId,
    //     required: false,
    //     ref: 'User'
    //     },
},{timestamps:true})

export const Blog = model("Blog", blogSchema);