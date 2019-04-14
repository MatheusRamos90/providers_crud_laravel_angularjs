import app from '../../../src/global/global.app.js';

app.directive('pcAlert', function(){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            type: '@',
            position: '@',
            closeModal: '='
        },
        templateUrl: 'src/components/pc_alerts/pc_alert.html'
    };
});