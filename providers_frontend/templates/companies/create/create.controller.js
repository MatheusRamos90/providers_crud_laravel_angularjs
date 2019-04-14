import app from '../../../src/global/global.app.js';
import URL_API from '../../../src/api.app';

app.controller('createCompaniesController', function ($http,$scope,$location,$rootScope) {

    $scope.form_create = {
        estado: '',nome_fantasia: '',cnpj: '',slug: ''
    };

    $scope.submitCreate = function () {

        if($scope.form_create){

            const data = {
                estado: $scope.form_create.estado,
                nome_fantasia: $scope.form_create.nome_fantasia,
                cnpj: $scope.form_create.cnpj,
                slug: $scope.form_create.nome_fantasia.toLowerCase()
            };

            $http.post(URL_API + 'companies/create', data,{ headers: {'Content-Type': 'application/json'} }).then(function (response) {
                if(response.data.status === true){
                    $rootScope.showAlert("success", response.data.message);
                }else{
                    $rootScope.showAlert("warning", response.data.message);
                }
            }).catch(function(error){
                $rootScope.showAlert("danger", error);
            })
        }

    }


});