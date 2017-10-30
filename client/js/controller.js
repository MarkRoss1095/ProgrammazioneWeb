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
                var alertPopup = $ionicPopup.alert({
                    title: 'success ' + currentaccount.data.success,
                    template: currentaccount.data.msg
                });
            }
        };


    

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
