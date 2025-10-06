const joi=require('joi');

const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email().required(),
        password:joi.string().required()
    });
    const {error}=schema.validate(req.body);
    if(error)
    {
        return res.status(400)
        .json({message:"Bad Request",error:details[0].message});
    }
    next();
}

module.exports={loginValidation};