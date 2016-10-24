// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','starter.controllers1','starter.controllers2','starter.controllers3','starter.controllers4', 'starter.services','satellizer'])
.config(function($authProvider) {

    $authProvider.facebook({
      clientId: '572778666263598'
    });

    $authProvider.facebook({
      clientId: '572778666263598',
      responseType: 'token'
    });

    $authProvider.google({
      clientId: '434562448118-9cqjo5u84v2t8iope9u8sk24cf00cpd8.apps.googleusercontent.com'
    });
})
.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

});
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.plugins && window.cordova.plugins.googleplus) {
            window.cordova.plugins.googleplus.isAvailable(
                function (available) {
              console.log(available);
            });
        }

})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.tabs.position('top');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('signingoogle', {
  url: '/auth/google',
  templateUrl: 'templates/tabs.html'
})
.state('signinfb', {
url: '/auth/facebook',
templateUrl: 'templates/tabs.html'
})

  // Each tab has its own nav history stack:

  .state('tab.user', {
    url: '/user',
    views: {
      'tab-user': {
        templateUrl: 'templates/tab-user.html',
        controller: 'ProfileController'
      }
    }
  })

  .state('tab.links', {
      url: '/links',
      views: {
        'tab-links': {
          templateUrl: 'templates/tab-links.html',
          controller: 'LinkCtrl'
        }
      }
    })

  .state('tab.scanner', {
    url: '/scanner',
    views: {
      'tab-scanner': {
        templateUrl: 'templates/tab-scanner.html',
        controller: 'BarController'
      }
    }
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller:'demoController',


  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
