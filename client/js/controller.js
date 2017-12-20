angular.module('ProgWeb')

    ///////////////////////////////////////////////////// DICHIARAZIONE DEI CONTROLLER
    .controller('HomeCtrl', function ($scope, AuthService, $state, $http, $window) {

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        //Funzione per verificare a chi appartiene il profilo loggato

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }
    })
    /////////////////////////////////////////////////////////////////////////
    .controller('registrazioneCtrl', function ($scope, $http, AuthService, $state, $window) {
        $scope.user = {
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
            state: '',
            city: '',
            andress: '',
            bod: '',
            gender: '',
            matricola: '',
            codfacolta: '',
            phone: '',

        };

        $scope.addStudent = function () {
            AuthService.registerstudent($scope.user).then(function (msg) {
                $state.go("/")
                $window.alert(msg)
            }, function (errMsg) {
                $window.alert(errMsg)
            })

        }



    })
    ///////////////////////////////////////////////////////////////////////////////////
    .controller('loginCtrl', function ($scope, $http, AuthService, $state, $window) {
        $scope.user = {
            username: '',
            password: '',
            role: '',
        };

        $scope.login = function () {
            if ($scope.user.role !== 'prof' && $scope.user.role !== 'student' && $scope.user.role !== 'admin') {
                $window.alert('Selezionare ruolo')
            } else {

                if ($scope.user.role == 'student') {
                    AuthService.loginStudent($scope.user).then(function (msg) {
                        $state.go("/profiloStudente")
                        $window.alert('Login effettuato')
                    }, function (errmsg) {
                        $window.alert(errmsg)
                        window.location.reload()
                    })
                }
            }
            if ($scope.user.role == 'prof') {
                AuthService.loginProf($scope.user).then(function (msg) {
                    $state.go("/profiloProf")
                    $window.alert('Login effettuato')
                }, function (errmsg) {
                    $window.alert(errmsg)
                    window.location.reload()
                })
            }
            if ($scope.user.role == 'admin') {
                AuthService.loginAdmin($scope.user).then(function (msg) {
                    $state.go("/profiloAdmin")
                    $window.alert('Login effettuato. Benvenuto nella tua area privata!')
                }, function (errmsg) {
                    $window.alert(errmsg)
                    window.location.reload()
                })
            }

        }
    })
    /////////////////////////////////////////////////////////////////////
    .controller('profiloAdminCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        $scope.user = {
            username: '',
            password: '',
            email: '',
            nameP: '',
            surname: '',
            state: '',
            city: '',
            andress: '',
            bod: '',
            gender: '',

            codfacolta: '',
            phone: '',

        };
        $http.get('/showProfileAdmin').then(success, error);
        function success(user) {
            $scope.currentuser = user.data.admin;
        }
        function error(user) {
            $window.alert('Errore durante la ricerca del profilo è pregato di rifare il login')
            $state.go("/login")
            AuthService.logout();

        }

        $scope.currentuser = {
            username: '',
            password: '',
        };

   

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.addAdmin = function () {
            AuthService.registerAdmin($scope.admin).then(function (msg) {
                $window.alert('admin creato')
            }, function (errMsg) {
                $window.alert(errMsg)
            })

        }

        $scope.deleteProf = function (prof) {
            $http.post("/deleteProf", prof).then(success, err)
            function success(success) {
                $window.alert(success.data.msg)
            }
            function err(err) {
                $window.alert(err)
            }
        };
        $scope.deleteStudente = function (studente) {
            $http.post("/deleteStudent", studente).then(success, err)
            function success(success) {
                $window.alert(success.data.msg)
            }
            function err(err) {
                $window.alert(err)
            }
        };
        $scope.addProf = function () {
            AuthService.registerprof($scope.user).then(function (msg) {

                $window.alert(msg)
                $window.location.reload()

            }, function (errMsg) {
                $window.alert(errMsg)
            })
        }
        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }


    })
    //////////////////////////////////////////////////////////////
    .controller('corsoCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        /* funzioni per la navabar */
        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        /* FINE NAVBAR */



        $http.get('/showCorsi').then(success, error);
        function success(corso) {
            $scope.corso = corso.data.msg

        }
        function error(corso) {
            $window.alert('profilo non trovato, rifare il login')

        };
        $scope.newCorso = function () {
            $state.go('newcorso')
        }
        $scope.addCorso = function (newcorso) {
            /* funzione per aggiunger il corso */
            $http.post("/addCorso", newcorso).then(success, err)

            console.log(newcorso)
            function success(success) {
                $window.alert(success.data.msg)
                $window.history.back()
            }
            function err(err) {
                $window.alert(err)
            }
        }


        $scope.editCorso = function (search) {
            $http.post("/searchCorso", search).then(success, err)
            function success(success) {
                $state.go('editcorso')


            }
            function err(err) {
                $window.alert(err)
            }
            // $state.go('/user-detail/' + search._id);
        }







        $scope.deleteCorso = function (corso) {
            $http.post("/deleteCorso", corso).then(success, err)
            function success(success) {
                $window.alert(success.data.msg)


                window.location.reload()

                console.log(corso)
            }
            function err(err) {
                $window.alert(err)
            }

        }
    })
    //////////////////////////////////////////////////////////////////////
    .controller('editCorsoCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        $scope.currentcorso = {
            nome: '',
            anno: '',
            cfu: '',
            codfacolta: '',
            usernameProf: '',
        }
        $http.get('/viewCorso').then(success, error);
        function success(currentcorso) {
            $scope.currentcorso = currentcorso.data.msg

        }
        function error(err) {
            $window.alert('corso non trovato')

        };
        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };
        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $scope.update = function (updatecorso) {
            /* funzione per aggiunger il corso */
            console.log($scope.currentcorso)
            $http.put("/modifyCorso", updatecorso).then(success, err)
            function success(success) {
                updatecorso = $scope.currentcorso
                $window.alert(success.data.msg)

                console.log(updatecorso)
                $window.history.back()
                /* $state.go('/inside_info') */
            }
            function err(err) {
                $window.alert(err)
            }
        }

    })
    ////////////////////////////////////////////////////////////////////////////

    .controller('profiloProfCtrl', function ($scope, $http, $filter, AuthService, $state, $window) {

        $scope.currentprof = {
            username: '',

            email: '',
            nameP: '',
            surname: '',
            state: '',
            city: '',
            andress: '',
            bod: '',
            gender: '',
            codFacolta: '',
            phone: '',

        };

        /*  $scope.prof = {
             username: '',
        
             email: '',
             nameP: '',
             surname: '',
             state: '',
             city: '',
             andress: '',
             bod: '',
             gender: '',
            
             codFacolta: '',
             phone: '',
           
         }; */
        $scope.sblocca = function () {
            document.getElementById("CodFacolta").disabled = false;
            document.getElementById("state").disabled = false;
            document.getElementById("city").disabled = false;
            document.getElementById("address").disabled = false;
            document.getElementById("gender").disabled = false;
            document.getElementById("phone").disabled = false;
            document.getElementById("email").disabled = false;

            document.getElementById("document1").disabled = false;
            document.getElementById("document2").disabled = true;
        }

        $scope.modifyDatiP = function (updateprof) {
            /* funzione per aggiunger il corso */

            $http.put("/modifyDatiP", updateprof).then(success, err)
            function success(success) {
                updateprof = $scope.currentprof
                $window.alert(success.data.msg)

                console.log(updateprof)
                $window.location.reload()
            }
            function err(err) {
                $window.alert(err)
            }
        }

        $http.get('/showProfileProf').then(success, error);
        function success(user) {

            $scope.currentprof = user.data.prof;
            $scope.currentprof.bod = user.data.prof.bod.substring(0, 10)

        }

        function error(user) {
            $window.alert('Errore durante la ricerca del profilo è pregato di rifare il login')
            $state.go("/login")
            AuthService.logout();

        }





        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };



        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }

            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }


    })

    /////////////////////////////////////////////////////////////////////////////
    .controller('AppCtrl', function ($scope, $http, AuthService, $state, $window) {
        $scope.currentelenco = {
            username_prof: '', //aggiunto username_prof dopo
            esame: '',
            data: '',
            ora: '',



        }
        $scope.currentcorso = {
            nome: '',
            anno: '',
            cfu: '',
            codice: '',
            codfacolta: '',
            usernameProf: '',
        }
        
        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }
        $scope.searchCorsoForProf = function (search) {
            $http.post("/searchCorsoForProf", search).then(success, err)
            function success(success) { 
                console.log(search)
                $state.go('/inside_addappelli')
                            

      
            }
            function err(err) {
                $window.alert(err)
            }
        }

        $http.get('/ShowAppelliProf').then(success, err);
        function success(corso) {
        $scope.corso=corso.data.msg
        }
            function err(err) {
                $window.alert(err)
            };

            $scope.MostraAppelli = function (appello) {
                $http.get('/showAppelli').then(success, err);
                function success(appello) {
                    $scope.appello = appello.data.msg
                    document.getElementById("mostraApp").disabled = true
                }
                function err(err) {
                    $window.alert(err)
                };
            }

           

            $scope.deleteAppello = function (currentelenco) {
                $http.post("/deleteAppello", currentelenco).then(success, err)
                function success(success) {
                    $window.alert(success.data.msg)

                    console.log(currentelenco)
                    $window.location.reload()


                }
                function err(err) {
                    $window.alert(err)
                }

            }
            $scope.editAppello = function (search) {
                $http.post("/searchAppello", search).then(success, err)
                function success(success) {
                    $state.go('editAppello')


                }
                function err(err) {
                    $window.alert(err)
                }
            }

        })
        .controller('AddAppCtrl', function ($scope, $http, AuthService, $state, $window, ) {
            $scope.currentcorso = {
                nome: '',
                anno: '',
                cfu: '',
                codice:'',
                codfacolta: '',
                usernameProf: '',
            }
            $http.get('/viewcorso2').then(success, error);
            function success(currentcorso) {
                $scope.currentcorso = currentcorso.data.msg
    console.log($scope.currentcorso)
            }
            function error(err) {
                $window.alert('corso non trovato')
    
            };
            $scope.logout = function () {
                AuthService.logout();
                $window.alert('logout effettuato')
                $state.go('/');
            };
            $scope.showProfile = function () {
                $http.get('/showProfile').then(success, error);
                function success(currentaccount) {
    
                    if (currentaccount.data.msg == 'student') {
                        $state.go('/profiloStudente')
                    }
                    if (currentaccount.data.msg == 'admin') {
                        $state.go('/profiloAdmin')
                    }
                    if (currentaccount.data.msg == 'prof') {
                        $state.go('/profiloProf')
                    }
                }
                function error(currentaccount) {
                    $window.alert('profilo non trovato, rifare il login')
                    $state.go('/login')
                    AuthService.logout();
                };
            }
            $scope.addAppello = function(currentcorsoNome,newappello) {
$scope.newappello.esame=currentcorsoNome

                $http.post("/addAppello", newappello).then(success, err)

                function success(success) {
                    $window.alert('Appello Creato correttamente')
                    $window.history.back()

                }
                function err(err) {
                    $window.alert(err)
                }

            }
    
        })
    ////////////////////////////////////////////////////////////////////////////////        
    .controller('EditAppCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        $scope.currentappello = {

            esame: '',
            data: '',
            ora: '',
            aperto: '',
            iscritti: '',


        }

        $http.get('/viewAppello').then(success, error);
        function success(currentappello) {
            $scope.currentappello = currentappello.data.msg
            if ($scope.currentappello.aperto == false) {
                document.getElementById("chiudi").disabled = true;
            }

        }
        function error(err) {
            $window.alert(err)
        };
        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };
        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $scope.update = function (updateappello) {
            /* funzione per aggiunger il corso */

            $http.put("/editAppello", updateappello).then(success, err)
            function success(success) {
                updateappello = $scope.currentelenco
                $window.alert(success.data.msg)


                $window.history.back()
                /* $state.go('/inside_info') */
            }
            function err(err) {
                $window.alert(err)
            }
        }
        $scope.chiudiappello = function (chiudiappello) {
            /* funzione per aggiunger il corso */

            $http.put("/chiudiAppello", chiudiappello).then(success, err)
            function success(success) {
                chiudiappello = $scope.currentelenco
                $window.alert(success.data.msg)


                $window.history.back()
                /* $state.go('/inside_info') */
            }
            function err(err) {
                $window.alert(err)
            }
        }

        $scope.editElenco = function (search) {
            $http.post("/searchElenco", search).then(success, err)
            function success(success) {
                console.log(search)
                $state.go('/inside_edit_elenco')


            }
            function err(err) {
                $window.alert(err)
            }
        }
        $scope.showIscritti = function (currentappello) {
            if ($scope.currentappello.iscritti !== 0) {
                $http.get('/IscrittiAppello').then(success, error);
                function success(iscritti) {
                    $scope.iscritti = iscritti.data.msg
                    document.getElementById("iscritti").disabled = true

                }
                function error(err) {
                    $window.alert(err)
                }
            }
            else {
                $window.alert("non ci sono iscritti")
            }
        }
    })
    ////////////////////////////////////////////////////////////////////////////////////
    .controller('IscrittiCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        $scope.currentelenco = {

            esame: '',
            nome: '',
            cognome: '',
            voto_provvisorio: '',
            voto_definitivo: '',
            accettato: '',
            conferma: '',



        }

        $http.get('/viewElenco').then(success, error);
        function success(currentelenco) {
            $scope.currentelenco = currentelenco.data.msg
            if ($scope.currentelenco.accettato == false) {
                document.getElementById("").disabled = true
            }
            console.log($scope.currentelenco)
        }
        function error(err) {
            $window.alert(err)
        };
        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };
        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $scope.updateElenco = function (updateelenco) {
            /* funzione per aggiunger il corso */

            $http.put("/editElenco", updateelenco).then(success, err)
            function success(success) {
                updateelenco = $scope.currentelenco
                $window.alert(success.data.msg)


                $window.history.back()
                /* $state.go('/inside_info') */
            }
            function err(err) {
                $window.alert(err)
            }
        }
    })
    ///////////////////////////////////////////////////////////////////////////////////
    .controller('profiloStudentCtrl', function ($scope, $http, $filter, AuthService, $state, $window) {

        $scope.currentstudent = {
            username: '',

            email: '',
            name: '',
            surname: '',
            state: '',
            city: '',
            andress: '',
            bod: '',
            gender: '',
            matricola: '',
            codFacolta: '',
            phone: '',
            annoCorso: ''
        }
        $scope.sblocca = function () {
            document.getElementById("CodFacolta").disabled = false;
            document.getElementById("state").disabled = false;
            document.getElementById("city").disabled = false;
            document.getElementById("address").disabled = false;
            document.getElementById("gender").disabled = false;
            document.getElementById("phone").disabled = false;
            document.getElementById("email").disabled = false;

            document.getElementById("document1").disabled = false;
            document.getElementById("document2").disabled = true;
        }


        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $http.get('/showProfileStudent').then(success, error);
        function success(user) {
            $scope.currentstudent = user.data.student;
            console.log($scope.currentstudent)
        }
        function error(user) {
            $window.alert('Errore durante la ricerca del profilo è pregato di rifare il login')
            $state.go("/login")
            AuthService.logout();

        }

        $scope.modifyDati = function (updatestudent) {
            /* funzione per aggiunger il corso */

            $http.put("/modifyDati", updatestudent).then(success, err)
            function success(success) {
                updatestudent = $scope.currentstudent
                $window.alert(success.data.msg)

                $window.location.reload()
            }
            function err(err) {
                $window.alert(err)
            }
        }



        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };





    })

    /////////////////////////////////////////////////////////////
    .controller('AppelliStudCtrl', function ($scope, $http, $filter, AuthService, $state, $window) {
        $scope.currentelenco = {

            iscritti: ""


        }
        $scope.currentvoto={
            voto_provvisorio:'',
            conferma:'',
            accettato:'',
            voto_definitivo:'',

        }

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }


        $http.get('/mostraAppelli').then(success, error);
        function success(appello) {
            if (appello) {
                $scope.appello = appello.data.msg

            }
            $http.get('/mostraRisultati').then(success, error);
            function success(risultati) {
                if (risultati) {
                    $scope.risultati = risultati.data.msg
                    console.log($scope.risultati)
                }
            }
            function error(appello) {
                $window.alert(error)

            };
        }
        function error(appello) {
            $window.alert(error)

        };
        $scope.iscrivitiAppello = function (currentelenco) {

            $http.post("/searchAppello", currentelenco).then(success, err)
            function success(success) {
                console.log(currentelenco)
                $http.put("/iscrivitiAppello", currentelenco).then(success, err)
                function success(success) {
                    currentelenco = $scope.currentelenco
                    $window.location.reload()
                    $window.alert(success.data.msg)


                    /* $window.history.back() */

                }
                function err(err) {
                    $window.alert(err)
                }


            }
            function err(err) {
                $window.alert(err)
            }

        }
        $scope.cancellaIscrizione = function (currentelenco) {

            $http.post("/searchAppello", currentelenco).then(success, err)
            function success(success) {
                console.log(currentelenco)
                $http.post("/cancellaPrenotazione", currentelenco).then(success, err)
                function success(success) {
                    currentelenco = $scope.currentelenco
                    $window.location.reload()
                    $window.alert(success.data.msg)


                    /* $window.history.back() */

                }
                function err(err) {
                    $window.alert(err)
                }


            }
            function err(err) {
                $window.alert(err)
            }

        }

        $scope.confermavoto = function(currentvoto)
        {
            console.log(currentvoto)
        }

    })
    ////////////////////////////////////////////////////////

    .controller('PianoCtrl', function ($scope, $http, AuthService, $state, $window, ) {

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                }}})
                
                .controller('RicercheCtrl', function ($scope, $http, AuthService, $state, $window, ) {
                    
                      $scope.logout = function () {
                          AuthService.logout();
                          $window.alert('logout effettuato')
                          $state.go('/');
                      };
      
                      $scope.showProfile = function () {
                          $http.get('/showProfile').then(success, error);
                          function success(currentaccount) {
              
                              if (currentaccount.data.msg == 'student') {
                                  $state.go('/profiloStudente')
                              }
                              if (currentaccount.data.msg == 'admin') {
                                  $state.go('/profiloAdmin')
                              }
                              if (currentaccount.data.msg == 'prof') {
                                  $state.go('/profiloProf')
                              }
                          }
                          function error(currentaccount) {
                              $window.alert('profilo non trovato, rifare il login')
                              $state.go('/login')
                              AuthService.logout();
                          };
                      }
                     
                      $scope.mostraProf = function () {
                        
                      $http.get('/showUsernameProf').then(success, error);
                      function success(pr) {
                      
                          $scope.pr = pr.data.msg
                        document.getElementById("prof").disabled=true
                         }
                      
                      function error(usernameProf) {
                          $window.alert(error)
              
                      };
                    
                    }
                    $scope.mostraCorsi = function () {
                       
                      $http.get('/mostraCorsi').then(success, error);
                      function success(corso) {
                       
                          $scope.corso =corso.data.msg
                         document.getElementById("corso").disabled=true
                      
                      }
                      function error(corso) {
                          $window.alert(error)
              
                      };
                                        }

                                        
                    })
        ////////////////////////////////////////////////////////////////////////////////////////////
        .controller('AndamentoCtrl', function ($scope, $http, $filter, AuthService, $state, $window) {
            $scope.logout = function () {
                AuthService.logout();
            };
        


        $http.post('/PianoDiStudi').then(success, error);
        function success(corso) {

            $scope.corso = corso.data.msg
        }
        function error(error) {
            $window.alert(error)

        };

    })

    .controller('RicercheCtrl', function ($scope, $http, AuthService, $state, $window, ) {

        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }

        $scope.mostraProf = function () {

            $http.get('/showUsernameProf').then(success, error);
            function success(pr) {

                $scope.pr = pr.data.msg
                document.getElementById("prof").disabled = true
            }

            function error(usernameProf) {
                $window.alert(error)

            };

        }
        $scope.mostraCorsi = function () {

            $http.get('/mostraCorsi').then(success, error);
            function success(corso) {

                $scope.corso = corso.data.msg
                document.getElementById("corso").disabled = true

            }
            function error(corso) {
                $window.alert(error)

            };
        }


    })
    ////////////////////////////////////////////////////////////////////////////////////////////
    .controller('AndamentoCtrl', function ($scope, $http, $filter, AuthService, $state, $window) {
        $scope.logout = function () {
            AuthService.logout();
            $window.alert('logout effettuato')
            $state.go('/');
        };

        $scope.showProfile = function () {
            $http.get('/showProfile').then(success, error);
            function success(currentaccount) {

                if (currentaccount.data.msg == 'student') {
                    $state.go('/profiloStudente')
                }
                if (currentaccount.data.msg == 'admin') {
                    $state.go('/profiloAdmin')
                }
                if (currentaccount.data.msg == 'prof') {
                    $state.go('/profiloProf')
                }
            }
            function error(currentaccount) {
                $window.alert('profilo non trovato, rifare il login')
                $state.go('/login')
                AuthService.logout();
            };
        }


        $http.get('/valori').then(success, error);
        function success(student) {
            $scope.student = student.data.msg[0]
            $scope.student2 = student.data.msg[1]
            $scope.student3 = student.data.msg[2]
            $scope.student4 = new Array()
            $scope.lungh = (student.data.msg.length) - 3
            var i;
            $scope.boh2 = function () {

                for (i = 0; i < $scope.lungh; i++) {
                    $scope.student4[i] = student.data.msg[i + 2] //QUI HO I SINGOLI VOTI CONSEGUITI 
                }

                return $scope.student4
            }


            $http.get('/valori2').then(success, error);
            function success(ciao) {
                $scope.etichett = new Array()
                var leng = ciao.data.msg.length
                $scope.boh = function () {
                    var i;
                    for (i = 0; i < leng; i++) {
                        $scope.etichett[i] = ciao.data.msg[i]
                    } console.log($scope.etichett)
                    return $scope.etichett
                }
            }
            function error(corso) {
                $window.alert(error)
            };

            $scope.grafico2 = function () {
                var ctx2 = document.getElementById("myChart2").getContext("2d");
                var myChart2 = new Chart(ctx2, {
                    type: 'line',
                    data: {
                        labels: $scope.boh(),
                        datasets: [{
                            label: 'ANDAMENTO ESAMI',
                            data: $scope.boh2(),
                            backgroundColor: "rgba(153,255,51,0.7)"
                        }]
                    }
                });


                var ctx = document.getElementById("myChart");
                var ctx = document.getElementById("myChart").getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ["CFU CONSEGUITI", "CFU DA CONSEGUIRE",],
                        datasets: [{
                            backgroundColor: [
                                "#f1c40f",
                                "#e74c3c",
                            ],
                            data: [$scope.student3, 180 - $scope.student3]
                        }]
                    }
                });

                var ctx5 = document.getElementById("myChart5").getContext('2d');
                var myChart5 = new Chart(ctx5, {
                    type: 'pie',
                    data: {
                        labels: $scope.boh(),
                        datasets: [{
                            backgroundColor: [
                                "#2ecc71",
                                "#3498db",
                                "#95a5a6",
                                "#9b59b6",
                                "#f1c40f",
                                "#e74c3c",
                                "#34495e"
                            ],
                            data: $scope.boh2()
                        }]
                    }
                });


            }
        }

        function error(corso) {
            $window.alert(error)

        };



    })