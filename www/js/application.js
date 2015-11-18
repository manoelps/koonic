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

angular.module('ionic_starter').service('IonicUser', function($q, $http) {
  var user;
  Ionic.io();
  user = null;
  this.getUser = function(custom_user_id) {
    var deferred;
    user = Ionic.User.current();
    if (!user.id && !custom_user_id) {
      user.id = Ionic.User.anonymousId();
    } else {
      user.id = custom_user_id;
    }
    deferred = $q.defer();
    user.save().then(function(success) {
      success.data = user;
      return deferred.resolve(success);
    }, function(failure) {
      return deferred.reject(failure);
    });
    return deferred.promise;
  };
  this.setUserData = function(user_data) {
    var deferred;
    user.set('name', user_data.name);
    user.set('surname', user_data.surname);
    user.set('nickname', user_data.nickname);
    user.set('image', user_data.image);
    user.set('age', user_data.age);
    user.set('can_code', user_data.can_code);
    user.set('updated_at', new Date());
    deferred = $q.defer();
    user.save().then(function(success) {
      return deferred.resolve(success);
    }, function(failure) {
      return deferred.reject(failure);
    });
    return deferred.promise;
  };
  return this;
});
