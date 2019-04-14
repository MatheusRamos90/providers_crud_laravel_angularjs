import app from '../../../src/global/global.app.js';

app.component('pcToolbar', {
    controller: function($http,$scope,$location) {

        $scope.opensidebar = null;

        $scope.showSidebar = function () {
            var sidebar = document.querySelector('.pc-sidebar');
            var wrapper = document.querySelector('.pc-wrapper');
            if($scope.opensidebar){
                $scope.opensidebar = false;
                sidebar.classList.remove('hide_sidebar');
                wrapper.classList.add('expand_wrapper');
            }else{
                $scope.opensidebar = true;
                sidebar.classList.add('hide_sidebar');
                wrapper.classList.remove('expand_wrapper');
            }
         };

    },
    templateUrl: 'src/components/pc_toolbar/pc_toolbar.html'
});