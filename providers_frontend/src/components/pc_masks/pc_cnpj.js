import app from '../../../src/global/global.app.js';

app.directive('pcCnpj', function() {
    return {
        require: '?ngModel',
        link: function($scope, element, attrs, controller) {
            element.mask("00.000.000/0000-00");
        }
    };
});