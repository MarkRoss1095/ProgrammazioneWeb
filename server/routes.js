const   express= require('express'),
router=express.Router(),

/// CONTROLLER ///

userController=require('./function/student');
ProfController=require('./function/professori');
adminController=require('./function/admin');
controller=require('./function/controller');

module.exports = router;

// ROUTE 
router.get('/showProfile',controller.showProfile);
router.get('/showCorsi',controller.showCorsi);

    //ROUTER FOR USER = studente
router.get('/showProfileStudent',userController.showProfileStudent)
router.post('/addStudent',userController.addStudent); //lo studente può registrarsi
router.post('/loginStudent', userController.loginStudent); //lo studente può fare un login
router.get('/mostraCorsi',userController.mostraCorsi);  //lo studente può vedere tutti i corsi disponibili
router.get('/Carriera',userController.Carriera);  //lo studente può vedere tutti i corsi disponibili
router.get('/mostraCorsiStu',userController.mostraCorsiStu);  //lo studente può vedere tutti i corsi disponibili

/* router.post('/pianoDiStudi',userController.PianoDiStudi); //studente può visualizzare il suo piano di studi
 *//* router.post('/ricercaCorso',userController.ricercaCorso); //studente può ricercare un corso
 *//* router.post('/ricercaProf',userController.ricercaProf); //studente può cercare un professore
 */router.put('/modifyDati',userController.modifyDati); //lo studente può modificare i suoi dati personali 
router.put('/iscrivitiAppello', userController.iscrivitiAppello); //lo studente può registrarsi ad un appello
router.post('/cancellaPrenotazione',userController.cancellaPrenotazione); //lo studente può cancellare la sua prenotazione all'appello
router.get('/showUsernameProf',userController.showUsernameProf) //mostra tutti gli username dei professori in modo da poterli ricercare in seguito
router.get('/mostraAppelli', userController.mostraAppelli)//mostra tutti gli appelli del prof 
/* router.get('/valori', userController.valori); 
 */
/* router.get('/valori2', userController.valori2);
 */router.get('/mostraRisultati', userController.mostraRisultati);
router.get('/valori', userController.valori); 
router.get('/valori2', userController.valori2);
router.put('/confermaVoto',userController.confermaVoto)


//route for admin
router.get('/showProf',adminController.showProf); //studente può cercare un professore
router.post('/addProf',adminController.addProf);
router.get('/showProfileAdmin',adminController.showProfileAdmin);
router.post('/searchCorso',adminController.searchCorso);//per vedere quale corso ho preso
router.post('/addAnotherAdmin',adminController.addAnotherAdmin); //l'admin può creare o aggiungere un altro admin
router.post('/loginAdmin', adminController.loginAdmin); //l'admin può loggarsi
router.post('/addCorso',   adminController.addCorso); //l'admin può aggiungere un corso
/* router.post('/populateFacolta',adminController.populateFacolta); */ //l'admin può popolare le facoltà DAAA FAREEE
router.put('/modifyCorso', adminController.modifyCorso); //l'admin può modificare un corso
router.post('/deleteCorso', adminController.deleteCorso); //l'admin può eliminare un corso
router.post('/deleteProf', adminController.deleteProf); //l'admin può eliminare un prof
router.post('/deleteStudent', adminController.deleteStudent); // l'admin può elminare uno studente
router.get('/viewCorso', adminController.viewCorso);//per vedere un determinato corso


//ROUTE FOR PROF
router.get('/showProfileProf',ProfController.showProfileProf);
router.get('/ShowAppelliProf', ProfController.ShowAppelliProf)
router.post('/searchElenco', ProfController.searchElenco);//per trovare quale appello ho preso
router.get('/viewElenco', ProfController.viewElenco);//per mostrare quel determinato appello
router.put('/editElenco', ProfController.editElenco)
router.post('/loginProf',  ProfController.loginProf); //il  prof può loggarsi
router.post('/addAppello', ProfController.addAppello); //il prof può aggiungere un appello
router.put('/chiudiAppello', ProfController.chiudiAppello); //prof può chiudere un appello
router.put('/editAppello', ProfController.editAppello); //prof può modiciare i dati di un appello
router.put('/modifyDatiP',  ProfController.modifyDatiP); //il prof può modificare i suoi dati personali
router.get('/IscrittiAppello',ProfController.iscrittiAppello) //mostra chi si è iscritto all'appello 
router.post('/deleteAppello', ProfController.deleteAppello); //l'admin può rimuovere un appello 
router.post('/searchAppello', ProfController.searchAppello);//per trovare quale appello ho preso
router.get('/viewAppello', ProfController.viewAppello);//per mostrare quel determinato appello
router.get('/showAppelli', ProfController.showAppelli)//mostra tutti gli appelli del prof 
router.post('/searchCorsoForProf',ProfController.searchCorsoForProf);
router.get('/viewcorso2', ProfController.viewcorso2);//per vedere un determinato corso
