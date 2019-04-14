import app from '../global/global.app.js';

/**
 * @Config Routes configurations and Others
 * *
 */
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', { controller: 'listProvidersController', templateUrl: 'templates/providers/list/list.html' }).
    when('/providers/create', { controller: 'createProvidersController', templateUrl: 'templates/providers/create/create.html' }).
    when('/companies/create', { controller: 'createCompaniesController', templateUrl: 'templates/companies/create/create.html' }).
    otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

});
