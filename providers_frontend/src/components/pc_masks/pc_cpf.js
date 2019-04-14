import app from '../../../src/global/global.app.js';

app.directive('pcCpf', function() {
    return {
        require: '?ngModel',
        link: function($scope, element, attrs, controller) {
            element.mask("000.000.000-00");
        }
    };
});