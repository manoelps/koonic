angular.module 'ionic_starter', [
	'ionic'
	'ionic.service.core'
	'ionic.service.analytics'
]

angular.module('ionic_starter').run ($rootScope, $ionicPlatform, $ionicAnalytics, $ionicPopup ) ->
	$ionicPlatform.ready ->

		# Cordova Plugins

		if window.cordova and window.cordova.plugins.Keyboard
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
		if window.StatusBar
			StatusBar.styleDefault()

		# Analytics

		$ionicAnalytics.register()


		# Ionic User

		current_user =
			'username': 'macchie'
			'email': 'a.macchieraldo@gmail.com'
			'password': 'password'
		
		current_user.custom =
			'first_name': 'Andrea'
			'last_name': 'Macchieraldo'
			'favorite_color': 'blue'
			'website': 'http://www.koodit.it'


		$rootScope.signupSuccess = (resp) ->
			console.log resp 

		$rootScope.signupFailure = (resp) ->
			console.log resp
			$ionicPopup.alert( { title: 'Error', template: 'Email already present.' } ) if resp.errors.indexOf('conflict_email') isnt -1
			$rootScope.sign_in(current_user)

		$rootScope.sign_up = (user) ->
			Ionic.Auth.signup(user).then $rootScope.signupSuccess, $rootScope.signupFailure

		$rootScope.sign_up(current_user)



		$rootScope.signinSuccess = (resp) ->
			console.log resp 

		$rootScope.signinFailure = (resp) ->
			console.log resp
			$ionicPopup.alert( { title: 'Error', template: 'Email already present.' } ) if resp.errors.indexOf('conflict_email') isnt -1

		authSettings = { 'remember': true }

		$rootScope.sign_in = (user) ->
			Ionic.Auth.login('basic', authSettings, user).then $rootScope.signinSuccess, $rootScope.signinFailure
		

