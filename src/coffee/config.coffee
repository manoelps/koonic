angular.module('ionic_starter').config ($stateProvider, $urlRouterProvider, $httpProvider) ->
  
  # routes

  $stateProvider.state 'app',
    url: '/app'
    abstract: true
    templateUrl: 'templates/menu.html'

  $stateProvider.state 'app.home',
    url: '/home'
    views: 'menu_content':
      templateUrl: 'templates/home.html'
      controller: 'HomeController'

  $urlRouterProvider.otherwise '/app/home'

