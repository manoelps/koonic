angular.module('ionic_starter').config ($stateProvider, $urlRouterProvider, $httpProvider) ->
  
  # Override default Content-Type for POST request

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  #$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

  param = (obj) ->
    # if !angular.isObject(obj)
    #   return if obj == null then '' else obj.toString()
    query = ''
    name = undefined
    value = undefined
    fullSubName = undefined
    subName = undefined
    subValue = undefined
    innerObj = undefined
    i = undefined
    for name of obj
      `name = name`
      value = obj[name]
      if value instanceof Array
        for i of value
          `i = i`
          subValue = value[i]
          fullSubName = name + '[' + i + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
      else if value instanceof Object
        for subName of value
          `subName = subName`
          subValue = value[subName]
          fullSubName = name + '[' + subName + ']'
          innerObj = {}
          innerObj[fullSubName] = subValue
          query += param(innerObj) + '&'
      else if value != undefined and value != null
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
    if query.length then query.substr(0, query.length - 1) else query

  $httpProvider.defaults.transformRequest = (data, getHeaders) ->
    param data

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

