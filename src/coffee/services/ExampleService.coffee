angular.module('ionic_starter').service('Example', ($q, $http)->

  urlBase = ''

  this.test = () ->
    deferred = $q.defer()
    $http({
      url: urlBase + 'test'
      method: 'POST'
    })
    .then (data)->
      deferred.resolve(data)
    , (data) ->
      deferred.reject(data)

    deferred.promise

  this
)
