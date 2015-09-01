angular.module('ionic_starter').controller 'HomeController', ($scope, $interval, $http) ->

	$interval (->
		if $scope.auto_update
			$scope.refreshCount()
	), 300000

	$scope.auto_update = true

	usersCount = () ->
		$http(
			url: 'http://fantausers.cloudapp.net/api/v1/users/count'
			method: 'GET'
		).then (response) ->
			$scope.users = response.data

	latestUsernames = () ->
		$http(
			url: 'http://fantausers.cloudapp.net/api/v1/users/latest_usernames'
			method: 'GET'
		).then (response) ->
			$scope.latest_usernames = response.data

	footballUsersCount = () ->
		$http(
			url: 'http://www.fantarevolution.com/api/v1/public/football_users_count'
			method: 'GET'
		).then (response) ->
			$scope.football_users = response.data

	cupsCount = () ->
		$http(
			url: 'http://fantarevolution.com/api/v1/cups/teams_count'
			method: 'GET'
		).then (response) ->
			$scope.cups = response.data

	latestTeamNames = () ->
		$http(
			url: 'http://fantarevolution.com/api/v1/public/latest_team_names'
			method: 'GET'
		).then (response) ->
			$scope.latest_team_names = response.data

	$scope.refreshCount = () ->
		usersCount()
		cupsCount()
		footballUsersCount()
		latestTeamNames()
		latestUsernames()

	$scope.refreshCount()