const joi=require('joi');

const createemployevalidation=(req,res,next)=>{
    const schema=joi.object({
        emp_id:joi.number().integer().required(),
        name:joi.string().required(),
        email:joi.string().email().required(),
        position:joi.string().required(),
        contact_no:joi.number().integer().min(1000000000).max(9999999999).required(),
        role:joi.string().required()
    });
    const {error}=schema.validate(req.body);
    if(error)
    {
        console.log(error);
        return res.status(400)
        .json({message:"Bad Request"})
    }
    next();
}

const updateemployeevalidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string(),
        email:joi.string().email(),
        position:joi.string(),
        contact_no:joi.number().integer().min(1000000000).max(9999999999),
        role:joi.string().required()
    })
    const {error}=schema.validate(req.body);
    if(error)
    {
        console.log(error);
        return res.status(400)
        .json({message:"Bad Request",error:error.details[0].message});
    }
    next();
}


module.exports={createemployevalidation,updateemployeevalidation};