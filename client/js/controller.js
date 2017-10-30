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

       
        function Main($scope) {
            $scope.corso.nome;
            $scope.corso.codFacolta;
            $scope.corso.codice;
            $scope.corso.cfu;
            $scope.corso.anno;
            $scope.corso.usernameProf   ;
          }
        $http.get('/showCorsi').then(success, error);
        function success(corso) {
            $scope.corso = corso.data.msg
            }
        function error(corso) {
            $window.alert('profilo non trovato, rifare il login')
          
        };


    })        