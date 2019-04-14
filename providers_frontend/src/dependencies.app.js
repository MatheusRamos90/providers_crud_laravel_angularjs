/**
 * @Entries jQuery, Popper.js, Bootstrap, AngularJS, Angular Material, Angular Animate
 * */

//jQuery
import 'jquery';

//Popper.js
import 'popper.js/dist/umd/popper.min.js';

//Bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//Font-Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

require('jquery-mask-plugin/dist/jquery.mask.min.js');

/**
 * @AngularJS App, Routes, Components, Controllers
 * */
require('./global/global.app.js');
require('./api.app.js');
require('./config/config.app.js');

//Angular, Angular Route
import 'angular/angular.min.js';
import 'angular-route/angular-route.min.js';
import 'angular-animate/angular-animate.min.js';
import 'angular-aria/angular-aria.min.js';
import 'angular-messages/angular-messages.min.js';

/**
 * Components
 * */
require('./components/root.components.js');

/**
 * Controllers
 * */
require('../templates/companies/create/create.controller.js');
require('../templates/providers/create/create.controller.js');
require('../templates/providers/list/list.controller.js');



