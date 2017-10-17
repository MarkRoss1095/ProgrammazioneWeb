const   express= require('express'),
        router=express.Router(),
/// CONTROLLER ///
userController=require('./function/student');
ProfController=require('./function/professori');
adminController=require('./function/admin');

module.exports = router;


// ROUTE 
    //ROUTER FOR USER = student
router.post('/addStudent',userController.addStudent); //ok
router.post('/loginStudent', userController.loginStudent);
//router.post('/addFacolta',userController.addFacolta); //??
router.post('/addCorso',userController.addCorso); //?? 
//router.post('/modifyProfile', userController.);
    

//route for admin
//router.post('/removeUser', adminController.);
router.post('/loginAdmin', adminController.loginAdmin);
router.delete('/deleteStudent',adminController.deleteStudent);
router.delete('/deleteProf',adminController.deleteProf);

//ROUTE FOR PROF
router.post('/addProf',ProfController.addProf);
router.post('/loginProf', ProfController.loginProf);
router.post('/addAppello', ProfController.addAppello);
router.put('/editAppello', ProfController.editAppello); //done
router.put('/chiudiAppello', ProfController.chiudiAppello);
router.delete('/removeAppello', ProfController.deleteAppello); //done
//router.post('/modifyProfile', ProfController.);
