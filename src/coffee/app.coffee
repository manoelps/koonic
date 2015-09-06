angular.module 'ionic_starter', [
  'ionic'
]


angular.module('ionic_starter').run ($rootScope, $ionicPlatform ) ->
  $ionicPlatform.ready ->
    if window.cordova and window.cordova.plugins.Keyboard
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
    if window.StatusBar
      StatusBar.styleDefault()
