angular.module('ionic_starter', ['ionic', 'ionic.service.core']);

angular.module('ionic_starter').run(function($rootScope, $ionicPlatform, $interval, IonicUser) {
  return $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    IonicUser.getUser().then(function(resp) {
      var user_data;
      $rootScope.current_user = resp.data;
      user_data = {
        name: 'Andrea',
        surname: 'Macchieraldo',
        nickname: 'macchie',
        image: 'http://minimemes.net/wp-content/uploads/2013/06/business_cat.jpg',
        age: 24,
        can_code: ['Coffee', 'Jade', 'Sass']
      };
      return IonicUser.setUserData(user_data).then(function() {
        var push;
        Ionic.io();
        push = new Ionic.Push({
          'debug': true,
          'onNotification': function(notification) {
            var payload;
            payload = notification.payload;
            return console.log(notification, payload);
          }
        });
        return push.register(function(token) {
          console.log('Got Token:', token.token);
          $rootScope.current_user.addPushToken(token);
          return $rootScope.current_user.save();
        });
      });
    });
    return $interval(function() {
      return $rootScope.current_time = new Date();
    }, 1000);
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
