import app from '../../../src/global/global.app.js';
import URL_API from "../../../src/api.app";

app.controller('listProvidersController', function ($http,$scope,$rootScope) {

    $scope.providers = [];
    $scope.companies = [];
    $scope.form_edit = {
        id: '',id_empresa: '',nome_fantasia: '',nome: '',telefone: '',tipo_pessoa: '',nro_documento: '',nro_rg: '',data_nascimento: '',data_cadastro: ''
    };
    $scope.minor_age = null;
    $scope.is_parana = null;

    $scope.form_filter = {
        nome: '', nro_documento: '', data_cadastro: ''
    };

    this.$onInit = function(){

        getProviders();

        $http.get(URL_API + 'companies', { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            $scope.companies = response.data;
        });

    };

    $scope.isParana = function () {

        $http.get(URL_API + 'companies/find-companie/' + $scope.form_edit.empresa, { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            response.data.estado === 'PR' ? $scope.is_parana = true : $scope.is_parana = false;
        });
    };

    $scope.isJuridica = function () {
        if($scope.form_edit.tipo_pessoa == "juridica"){
            $scope.form_edit.nro_rg = '';
            $scope.form_edit.data_nascimento = '';
        }
    };

    function getFullYearDate(value){
        var date = new Date(value);
        return date.getFullYear();
    }

    $scope.isMinorAge = function(){

        (new Date().getFullYear() - getFullYearDate($scope.form_edit.data_nascimento)) < 18 ? $scope.minor_age = true : $scope.minor_age = false;

    };

    $scope.formatDate = function(date) {
        var dateOut = new Date(date);
        return dateOut;
    };

    function getProviders(){
        $http.get(URL_API + 'providers', { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            $scope.providers = response.data;
        });
    }

    $scope.remove_provider_ = function (p, id) {

        var remove = confirm('Deseja realmente remover este dado?');
        if(remove){
            $http.delete(URL_API + 'providers/' + id, { headers: {'Content-Type': 'application/json'} }).then(response => {
                if(response.data.status === true){
                    $scope.providers.splice($scope.providers.indexOf(p), 1);
                    $rootScope.showAlert("success", response.data.message);
                }else{
                    $rootScope.showAlert("info", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })
        }

    };

    $scope.edit_ = function(id){

        $http.get(URL_API + 'providers/' + id, { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            $scope.form_edit = response.data.message[0];
        });

        $('#modalEditProvider').modal('show');

    };

    $scope.submitEditProvider = function(){

        if($scope.form_edit.tipo_pessoa == "fisica"){

            const data = {
                empresa: parseInt($scope.form_edit.empresa),
                nome: $scope.form_edit.nome,
                telefone: $scope.form_edit.telefone,
                tipo_pessoa: $scope.form_edit.tipo_pessoa,
                nro_documento: $scope.form_edit.nro_documento,
                nro_rg: $scope.form_edit.nro_rg,
                data_nascimento: $scope.form_edit.data_nascimento
            };

            $http.put(URL_API + 'providers/' + $scope.form_edit.id, data,{ headers: {'Content-Type': 'application/json'} }).then(function (response) {
                if(response.data.status === true){
                    $rootScope.showAlert("success", response.data.message);
                    getProviders();
                    $('#modalEditProvider').modal('hide');
                }else{
                    $rootScope.showAlert("warning", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })

        }else{

            const data = {
                empresa: parseInt($scope.form_edit.empresa),
                nome: $scope.form_edit.nome,
                telefone: $scope.form_edit.telefone,
                tipo_pessoa: $scope.form_edit.tipo_pessoa,
                nro_documento: $scope.form_edit.nro_documento
            };

            $http.put(URL_API + 'providers/' + $scope.form_edit.id, data,{ headers: {'Content-Type': 'application/json'} }).then(function (response) {
                if(response.data.status === true){
                    $rootScope.showAlert("success", response.data.message);
                    getProviders();
                    $('#modalEditProvider').modal('hide');
                }else{
                    $rootScope.showAlert("warning", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })
        }

    };

    $scope.remove_companie_ = function (c, id) {

        var remove = confirm('Deseja realmente remover este dado?');
        if(remove){
            $http.delete(URL_API + 'companies/' + id, { headers: {'Content-Type': 'application/json'} }).then(response => {
                if(response.data.status === true){
                    $scope.companies.splice($scope.companies.indexOf(c), 1);
                    $rootScope.showAlert("success", response.data.message);
                    getProviders();
                }else{
                    $rootScope.showAlert("info", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })
        }

    };

    $scope.submitFilterBy = function () {

        $http.post(URL_API + 'providers/filter-by', $scope.form_filter, { headers: {'Content-Type': 'application/json'} }).then(function (response) {
            if(response.data.status === true){
                $scope.providers = response.data.message;
                $('#modalFilter').modal('hide');
            }
        }).catch(function(error){
            $rootScope.showAlert("danger", error);
        })

    };

    $scope.cleanFilters = function () {
        $scope.providers = [];
        getProviders();
    };

});