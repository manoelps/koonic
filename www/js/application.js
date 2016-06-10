angular.module('ionic_starter', ['ionic', 'ionic.service.core', 'ionic.service.analytics']);

angular.module('ionic_starter').run(function($rootScope, $ionicPlatform, $ionicAnalytics, $ionicPopup) {
  return $ionicPlatform.ready(function() {
    var authSettings, current_user;
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    $ionicAnalytics.register();
    current_user = {
      'username': 'macchie',
      'email': 'a.macchieraldo@gmail.com',
      'password': 'password'
    };
    current_user.custom = {
      'first_name': 'Andrea',
      'last_name': 'Macchieraldo',
      'favorite_color': 'blue',
      'website': 'http://www.koodit.it'
    };
    $rootScope.signupSuccess = function(resp) {
      return console.log(resp);
    };
    $rootScope.signupFailure = function(resp) {
      console.log(resp);
      if (resp.errors.indexOf('conflict_email') !== -1) {
        $ionicPopup.alert({
          title: 'Error',
          template: 'Email already present.'
        });
      }
      return $rootScope.sign_in(current_user);
    };
    $rootScope.sign_up = function(user) {
      return Ionic.Auth.signup(user).then($rootScope.signupSuccess, $rootScope.signupFailure);
    };
    $rootScope.sign_up(current_user);
    $rootScope.signinSuccess = function(resp) {
      return console.log(resp);
    };
    $rootScope.signinFailure = function(resp) {
      console.log(resp);
      if (resp.errors.indexOf('conflict_email') !== -1) {
        return $ionicPopup.alert({
          title: 'Error',
          template: 'Email already present.'
        });
      }
    };
    authSettings = {
      'remember': true
    };
    return $rootScope.sign_in = function(user) {
      return Ionic.Auth.login('basic', authSettings, user).then($rootScope.signinSuccess, $rootScope.signinFailure);
    };
  });
});

angular.module('ionic_starter').config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  });
  $stateProvider.state('app.home', {
    url: '/home',
    views: {
      'menu_content': {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
      }
    }
  });
  return $urlRouterProvider.otherwise('/app/home');
});

angular.module('ionic_starter').controller('HomeController', function($scope, $interval, $http) {});

angular.module('ionic_starter').service('ExampleService', function($q, $http) {
  var urlBase;
  urlBase = '';
  this.test = function() {
    var deferred;
    deferred = $q.defer();
    $http({
      url: urlBase + 'test',
      method: 'POST'
    }).then(function(data) {
      return deferred.resolve(data);
    }, function(data) {
      return deferred.reject(data);
    });
    return deferred.promise;
  };
  return this;
});

angular.module('ionic_starter').service('IonicUser', function($q, $http) {
  return this;
});
