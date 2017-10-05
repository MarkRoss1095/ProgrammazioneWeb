const   express= require('express'),
        router=express.Router(),
/// CONTROLLER ///
userController=require('./function/user');

module.exports = router;

// ROUTE 
    //ROUTER FOR USER


router.post('/addStudent',      userController.addStudent); //ok


