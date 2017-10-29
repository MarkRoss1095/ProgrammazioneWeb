angular.module('ProgWeb')

    // DICHIARAZIONE DEI CONTROLLER

    .controller('HomeCtrl', function ($scope, $http, AuthService) {




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
            if ( $scope.user.role !== 'prof' && $scope.user.role !== 'student' && $scope.user.role !== 'admin') {
                $window.alert('Selezionare ruolo')
            } else {

                if ($scope.user.role == 'student') {
                    AuthService.loginStudent($scope.user).then(function (msg) {
                        $state.go("/home")
                        $window.alert('Login effettuato')
                    }, function (errmsg) {
                        $window.alert(errmsg)
                    })
                }
            }
            if ($scope.user.role == 'prof') {
                AuthService.loginProf($scope.user).then(function (msg) {
                    $state.go("/home")
                    $window.alert('Login effettuato')
                }, function (errmsg) {
                    $window.alert(errmsg)
                })
            }
            if ($scope.user.role == 'admin') {
                AuthService.loginProf($scope.user).then(function (msg) {
                    $state.go("/home")
                    $window.alert('Login effettuato')
                }, function (errmsg) {
                    $window.alert(errmsg)
                })
            }

        }
    })
