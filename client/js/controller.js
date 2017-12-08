angular.module('ProgWeb')

    // DICHIARAZIONE DEI CONTROLLER
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
                        $state.go("/inside_home")
                        $window.alert('Login effettuato')
                    }, function (errmsg) {
                        $window.alert(errmsg)
                    })
                }
            }
            if ($scope.user.role == 'prof') {
                AuthService.loginProf($scope.user).then(function (msg) {
                    $state.go("/inside_home")
                    $window.alert('Login effettuato')
                }, function (errmsg) {
                    $window.alert(errmsg)
                })
            }
            if ($scope.user.role == 'admin') {
                AuthService.loginAdmin($scope.user).then(function (msg) {
                    $state.go("/inside_home")
                    $window.alert('Login effettuato')
                }, function (errmsg) {
                    $window.alert(errmsg)
                })
            }

        }
    })
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

        $scope.admin = {
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
$scope.addProf=function(){
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
            $window.history.back()
            console.log(newcorso)
            function success(success) {
                $window.alert(success.data.msg)
              
            }
            function err(err) {
                $window.alert(err)
            }
        }


        $scope.editCorso = function (search) {
            $http.post("/searchCorso", search).then(success, err)
            function success(success) {
               $state.go('editcorso')
/* 
                function Main($scope) {
                    $scope.edit.nome;
                    $scope.edit.codice;
                    $scope.edit.codfacolta;
                    $scope.edit.cfu;
                    $scope.edit.usernameProfessore;
                    $scope.edit.anno;
                }

                console.log($scope.edit)
 */
               
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

            setTimeout(function() {
                 window.location.reload()},6000);
                
                console.log(corso)
            }
            function err(err) {
                $window.alert(err)
            }

        }
    })

    .controller('editCorsoCtrl', function ($scope, $http, AuthService, $state, $window, ) {
        $scope.currentcorso ={
            nome:'',
            anno:'',
            cfu:'',
            codfacolta:'',
            usernameProf:'',
        }
        $http.get('/viewCorso').then(success, error);
        function success(currentcorso) {
            $scope.currentcorso=currentcorso.data.msg

        }
        function error(err) {
            $window.alert('corso non trovato')
           
        };

        $scope.update = function (updatecorso) {
            /* funzione per aggiunger il corso */
            console.log($scope.currentcorso)
            $http.put("/modifyCorso",updatecorso).then(success, err)
            function success(success) {
                updatecorso=$scope.currentcorso
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


    .controller('profiloProfCtrl', function ($scope, $http,$filter, AuthService, $state, $window ) {
     
        $scope.currentprof = {
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

        $scope.prof = {
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
        $scope.sblocca=function(){
                     document.getElementById("CodFacolta").disabled=false;
            document.getElementById("state").disabled=false;
            document.getElementById("city").disabled=false;
            document.getElementById("address").disabled=false;
            document.getElementById("gender").disabled=false;
            document.getElementById("phone").disabled=false;
            document.getElementById("email").disabled=false;
           
            document.getElementById("button1").disabled=false;
            document.getElementById("button2").disabled=true;
        }
        
        $scope.modifyDatiP = function (updateprof) {
            /* funzione per aggiunger il corso */
           
            $http.put("/modifyDatiP",updateprof).then(success, err)
            function success(success) {
                updateprof=$scope.currentprof
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
                     $scope.currentprof.bod = user.data.prof.bod.substring(0,10)
               
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
        
               /*  $scope.addAdmin = function () {
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
                }; */
        
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
        