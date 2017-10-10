const   express= require('express'),
        router=express.Router(),
/// CONTROLLER ///
userController=require('./function/user');
ProfController=require('./function/professori');

module.exports = router;

// ROUTE 
    //ROUTER FOR USER


router.post('/addStudent',userController.addStudent); //ok
router.post('/addProf',ProfController.addProf);
router.post('/loginProf', ProfController.loginProf);
router.post('/loginStudent', userController.loginStudent);
router.post('/addAppello', ProfController.addAppello);
router.post('/addFacolta',userController.addFacolta);
router.post('/addCorso',userController.addCorso);
