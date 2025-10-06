const db = require("../database/db");

const addemp=async(req,res)=>{
    try{
        const {emp_id,name,email,position,contact_no}=req.body;
        const emp=await db.prepare("SELECT * FROM employee WHERE emp_id=?").get(emp_id);
        if(emp)
        {
            return res.status(409)
            .json({message:"Employee exist with given employee id",success:false});
        }
        const createemp=await db.prepare("INSERT INTO employee (emp_id,name,email,position,contact_no) VALUES (?,?,?,?,?)")
                                .run(emp_id,name,email,position,contact_no);

        return res.status(201)
                  .json({message:"Employee Added successfully into database",success:true});
        
    }catch(err){
        console.log(err);
        return res.status(500)
                  .json({message:"Internal server Error",success:false});
    }
}

const getemp=async(req,res)=>{
    try{
        const query=`SELECT * FROM employee`;
        db.all(query,[],(err,rows)=>{
            if(err)
            {
                console.log(err);
                return res.status(500)
                          .json({message:"Database query failed",message:false});
            }
            return res.status(200)
                      .json({message:"data as follow",success:true,data:rows});
        })
    }catch(err)
    {
        console.log(err);
                res.status(500)
                .json({message:"Internal Server Error",success:false})
    }
}

module.exports={addemp,getemp};