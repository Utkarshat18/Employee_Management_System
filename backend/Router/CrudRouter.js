const { addemp, getemp } = require('../Controller/crudController');
const { createemployevalidation } = require('../Middleware/crudMiddleware');

const router=require('express').Router();

router.post('/add',createemployevalidation,addemp);
router.get('/get',getemp);

module.exports=router;