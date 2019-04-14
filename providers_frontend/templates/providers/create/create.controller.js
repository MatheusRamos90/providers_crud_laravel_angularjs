import app from '../../../src/global/global.app.js';
import URL_API from '../../../src/api.app';

app.controller('createProvidersController', function ($http,$scope,$rootScope) {

    $scope.form_create = {
        empresa: '',nome: '',telefone: '',tipo_pessoa: '',nro_documento: '',nro_rg: '',data_nascimento: ''
    };

    $scope.minor_age = null;
    $scope.is_parana = null;

    $scope.companies = [];

    this.$onInit = function () {
        $http.get(URL_API + 'companies', { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            $scope.companies = response.data;
        });
    };

    $scope.isParana = function () {

        $http.get(URL_API + 'companies/find-companie/' + $scope.form_create.empresa, { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            response.data.estado === 'PR' ? $scope.is_parana = true : $scope.is_parana = false;
        });
    };

    $scope.isJuridica = function () {
        if($scope.form_create.tipo_pessoa == "juridica"){
            $scope.form_create.nro_rg = '';
            $scope.form_create.data_nascimento = '';
        }
    };

    function getFullYearDate(value){
        var date = new Date(value);
        return date.getFullYear();
    }

    $scope.isMinorAge = function(){

        (new Date().getFullYear() - getFullYearDate($scope.form_create.data_nascimento)) < 18 ? $scope.minor_age = true : $scope.minor_age = false;

    };

    $scope.formatDate = function(date) {
        var dateOut = new Date(date);
        return dateOut;
    };

    $scope.submitCreateProvider = function () {

        if($scope.form_create.tipo_pessoa == "fisica"){

            const data = {
                    empresa: parseInt($scope.form_create.empresa),
                    nome: $scope.form_create.nome,
                    telefone: $scope.form_create.telefone,
                    tipo_pessoa: $scope.form_create.tipo_pessoa,
                    nro_documento: $scope.form_create.nro_documento,
                    nro_rg: $scope.form_create.nro_rg,
                    data_nascimento: $scope.form_create.data_nascimento
                };

            $http.post(URL_API + 'providers/create', data,{ headers: {'Content-Type': 'application/json'} }).then(function (response) {
                if(response.data.status === true){
                    $rootScope.showAlert("success", response.data.message);
                }else{
                    $rootScope.showAlert("warning", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })

        }else{

            const data = {
                empresa: parseInt($scope.form_create.empresa),
                nome: $scope.form_create.nome,
                telefone: $scope.form_create.telefone,
                tipo_pessoa: $scope.form_create.tipo_pessoa,
                nro_documento: $scope.form_create.nro_documento
            };

            $http.post(URL_API + 'providers/create', data,{ headers: {'Content-Type': 'application/json'} }).then(function (response) {
                if(response.data.status === true){
                    $rootScope.showAlert("success", response.data.message);
                }else{
                    $rootScope.showAlert("warning", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })

        }

    };
});