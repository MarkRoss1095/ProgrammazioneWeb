const   express= require('express'),
        router=express.Router(),
/// CONTROLLER ///
userController=require('./function/user');
ProfController=require('./function/professori');

module.exports = router;


// ROUTE 
    //ROUTER FOR USER = student
router.post('/addStudent',userController.addStudent); //ok
router.post('/loginStudent', userController.loginStudent);
router.post('/addFacolta',userController.addFacolta); //??
router.post('/addCorso',userController.addCorso); //?? 

    //route for admin
    //router.post('/removeUser', ProfController.);
    



    //ROUTE FOR PROF

router.post('/addProf',ProfController.addProf);
router.post('/loginProf', ProfController.loginProf);
router.post('/addAppello', ProfController.addAppello);
//router.post('/addCorso', ProfController.);
//router.post('/closeAppello', ProfController.);
//router.post('/modifyAppello', ProfController.);
//router.post('/removeAppello', ProfController.);
//router.post('/modifyProfile', ProfController.);
