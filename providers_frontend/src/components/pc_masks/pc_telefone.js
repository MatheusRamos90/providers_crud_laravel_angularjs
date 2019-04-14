import app from '../../../src/global/global.app.js';

app.directive('pcTelefone', function() {
    return {
        require: '?ngModel',
        link: function($scope, element, attrs, controller) {
            element.mask("(00)000000000");
        }
    };
});