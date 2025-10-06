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

const updateemp=async(req,res)=>{
    try{
        console.log("this is controller");
        const { name, email, position,contact_no } = req.body;
        const { id } = req.params;
         const fields = [];
    const values = [];

    if (name) {
      fields.push("name = ?");
      values.push(name);
    }
    if (email) {
      fields.push("email = ?");
      values.push(email);
    }
    if (position) {
      fields.push("position = ?");
      values.push(position);
    }
    if (contact_no) {
      fields.push("contact_no = ?");
      values.push(contact_no);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const query = `UPDATE employee SET ${fields.join(", ")} WHERE emp_id = ?`;
    values.push(id);

    const stmt = db.prepare(query);
    const result = stmt.run(values);

    if (result.changes === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
    }catch(err){
        console.log(err);
    }
}

const deleteemp=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("This is controller")

        // Delete the employee
        db.prepare("DELETE FROM employee WHERE emp_id = ?").run(id);

        res.status(200).json({ 
            message: "Employee deleted successfully", 
            success: true 
        });
    }catch(err){
        console.log(err);
    }
}


module.exports={addemp,getemp,updateemp,deleteemp};