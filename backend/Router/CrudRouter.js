const { addemp } = require('../Controller/crudController');
const { createemployevalidation } = require('../Middleware/crudMiddleware');

const router=require('express').Router();

router.post('/add',createemployevalidation,addemp);

module.exports=router;