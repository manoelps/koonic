angular.module 'ionic_starter', [
	'ionic'
	'ionic.service.core'
]

angular.module('ionic_starter').run ($rootScope, $ionicPlatform, $interval, IonicUser  ) ->
	$ionicPlatform.ready ->

		# Cordova Plugins

		if window.cordova and window.cordova.plugins.Keyboard
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar true
		if window.StatusBar
			StatusBar.styleDefault()

		# Initiate a Ionic User, it also accepts a custom id (string) as argument
		# IonicUser.getUser('my-custom-id').then ...

		IonicUser.getUser().then (resp) ->
			$rootScope.current_user = resp.data

			user_data =
				name: 'Andrea'
				surname: 'Macchieraldo'
				nickname: 'macchie'
				image: 'http://minimemes.net/wp-content/uploads/2013/06/business_cat.jpg'
				age: 24
				can_code: [ 'Coffee', 'Jade', 'Sass' ]
			
			IonicUser.setUserData(user_data).then () ->
				# Push Notifications

				Ionic.io()

				push = new Ionic.Push({
					'debug': true
					'onNotification': (notification) ->
						payload = notification.payload
						console.log notification, payload
					# 'onRegister': (data) ->
					# 	console.log data.token
				})

				push.register (token) ->
					# Log out your device token (Save this!)
					console.log 'Got Token:', token.token
					$rootScope.current_user.addPushToken(token)
					$rootScope.current_user.save()

		# Current Time

		$interval ->
			$rootScope.current_time = new Date()
		, 1000


		

