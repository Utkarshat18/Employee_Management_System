const { addemp, getemp, updateemp } = require('../Controller/crudController');
const { createemployevalidation, updateemployeevalidation } = require('../Middleware/crudMiddleware');

const router=require('express').Router();

router.post('/add',createemployevalidation,addemp);
router.get('/get',getemp);
router.put('/update/:id',updateemployeevalidation,updateemp);

module.exports=router;