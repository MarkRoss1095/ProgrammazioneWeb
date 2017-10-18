const   express= require('express'),
router=express.Router(),

/// CONTROLLER ///
userController=require('./function/student');
ProfController=require('./function/professori');
adminController=require('./function/admin');


module.exports = router;

// ROUTE 
    //ROUTER FOR USER = student
router.post('/addStudent',userController.addStudent); //lo studente può registrarsi
router.post('/loginStudent', userController.loginStudent); //lo studente può fare un login
router.get('/mostraCorsi',userController.mostraCorsi);  //lo studente può vedere tutti i corsi disponibili
router.post('/pianoDiStudi',userController.PianoDiStudi); //studente può visualizzare il suo piano di studi
router.post('/ricercaCorso',userController.ricercaCorso); //studente può ricercare un corso
router.post('/ricercaProf',userController.ricercaProf); //studente può cercare un professore
router.put('/modifyDati',userController.modifyDati); //lo studente può modificare i suoi dati personali 

//route for admin
router.post('/addAnotherAdmin',adminController.addAnotherAdmin); //l'admin può creare o aggiungere un altro admin
router.post('/loginAdmin', adminController.loginAdmin); //l'admin può loggarsi
router.post('/addCorso',   adminController.addCorso); //l'admin può aggiungere un corso
router.put('/modifyCorso', adminController.modifyCorso); //l'admin può modificare un corso
router.delete('/deleteCorso', adminController.deleteCorso); //l'admin può eliminare un corso
router.delete('/deleteProf', adminController.deleteProf); //l'admin può eliminare un prof
router.delete('/deleteStudent', adminController.deleteStudent); // l'admin può elminare uno studente
router.post('/populateFacolta',adminController.populateFacolta); //l'admin può popolare le facoltà 
router.delete('/removeAppello', adminController.deleteAppello); //l'admin può rimuovere un appello

//ROUTE FOR PROF

router.post('/addProf',    ProfController.addProf); //il prof può registrarsi
router.put('/modifyDatiP',  ProfController.modifyDatiP); //il prof può modificare i suoi dati personali
router.post('/loginProf',  ProfController.loginProf); //il  prof può loggarsi
router.post('/addAppello', ProfController.addAppello); //il prof può aggiungere un appello
router.put('/chiudiAppello', ProfController.chiudiAppello); //prof può chiudere un appello
router.put('/editAppello', ProfController.editAppello); //prof può modiciare i dati di un appello

//router.post('/modifyProfile', ProfController.);
