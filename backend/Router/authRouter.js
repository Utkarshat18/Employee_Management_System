const { loginValidation } = require('../Middleware/authMiddleware');

const router=require('express').Router;

router.post('/login',loginValidation);

module.exports=router;