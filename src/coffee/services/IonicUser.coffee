angular.module('ionic_starter').service 'IonicUser', ($q, $http)->

  # kick off the platform web client
  Ionic.io()

  # Init user var
  user = null

  # this will give you a fresh user or the previously saved 'current user'
  this.getUser = (custom_user_id) ->
    
    user = Ionic.User.current()

    # if the user doesn't have an id, you'll need to give it one

    if !user.id && !custom_user_id
      user.id = Ionic.User.anonymousId()
    else
      user.id = custom_user_id

    # persist the user
    deferred = $q.defer()

    user.save().then (success)->
      success.data = user
      deferred.resolve(success)
    , (failure) ->
      deferred.reject(failure)

    deferred.promise

  # this will update user data
  this.setUserData = (user_data) ->

    user.set 'name', user_data.name
    user.set 'surname', user_data.surname
    user.set 'nickname', user_data.nickname
    user.set 'image', user_data.image
    user.set 'age', user_data.age
    user.set 'can_code', user_data.can_code

    user.set 'updated_at', new Date()

    # persist the user
    deferred = $q.defer()

    user.save().then (success)->
      deferred.resolve(success)
    , (failure) ->
      deferred.reject(failure)

    deferred.promise

  this
