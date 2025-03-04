import CustomError from "../utilities/Error.js"



export default function catchError(callBack) {
    return (req,res,next)=>{
        callBack(req,res,next).catch(err=>{
            next(new CustomError(err,400))
        })
    }
}