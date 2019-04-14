import URL_API from '../api.app.js';

/**
 * @App
 * */
export default angular.module('app', ['ngRoute', 'ngMessages']).run(function ($http,$location,$interval,$rootScope,$compile) {

    /**
     * @GlobalFunctions
     * */
    $rootScope.showAlert = function (type, message) {

        angular.element('body').append('<div class="pc-messages"></div>');
        var messages = angular.element(document.querySelector(".pc-messages"));

        messages.append(
            `<div class="alert alert-`+ type +` alert-dismissible pc-alert fade show" role="alert">
                <strong><i class="fas fa-info-circle"></i></strong>
                `+ message +`
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`
        );

        $interval(function () {
            angular.element(messages).remove();
        }, 4000);

    };

});