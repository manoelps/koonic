angular.module('ionic_starter', ['ionic']);

angular.module('ionic_starter').run(function($rootScope, $ionicPlatform) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      return StatusBar.styleDefault();
    }
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

angular.module('ionic_starter').service('Example', function($q, $http) {
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
