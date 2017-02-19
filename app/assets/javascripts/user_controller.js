(function (){
  var app = angular.module('App', []);

  app.config(function($httpProvider) {
    csrfToken = $('meta[name=csrf-token]').attr('content')
    $httpProvider.defaults.headers.post['X-CSRF-Token'] = csrfToken
    $httpProvider.defaults.headers.put['X-CSRF-Token'] = csrfToken
    $httpProvider.defaults.headers.patch['X-CSRF-Token'] = csrfToken
    // TODO: なぜかこのコメント外すとエラー出る
    // $httpProvider.defaults.headers.delete['X-CSRF-Token'] = csrfToken
  });

  app.factory('SkillService', function($http) {
    function updateSkill(id) {
      var $uri = 'http://127.0.0.1:3000/api/v1/users/' + id + '/skills';
      return $http({
          method : 'GET',
          url : $uri
      });
    }

    function addSkill(id, name) {
      var $uri = 'http://127.0.0.1:3000/api/v1/users/' + id + '/skills/new';
      var params = {}
      params.skill = {"name": name}
      return $http({
          method : 'POST',
          url : $uri,
          data: params
      });
    }

    return {
      update: function(id) {
        return updateSkill(id);
      },
      add: function(id, name) {
        return addSkill(id, name);
      }
    }
  });

  app.factory('LoginService', function($http) {
    function login(name, pass) {
      var $uri = 'http://127.0.0.1:3000/users/login';
      var user = {}
      user.name = name
      user.password = pass
      var params = {"user": user}
      return $http({
          method : 'POST',
          url : $uri,
          contentType: "application/json",
          data: params
      });
    }

    return {
      login: function(name, pass) {
        return login(name, pass);
      }
    }
  });

  app.controller('userCtrl', function($scope, SkillService, LoginService) {
    // initialize
    var id = location.pathname.match(/[1-9]+/);
    SkillService.update(id).then(function onSuccess(res){
      $scope.skills = res.data;
    });

    $scope.addSkill = function(){
      console.log("added")
      SkillService.add(id, $scope.skill).then(function onSuccess(res){
        SkillService.update(id).then(function onSuccess(res){
          $scope.skills = res.data;
        })
      });
    };

    $scope.login = function() {
      LoginService.login($scope.name, $scope.pass).then(function onSuccess(res){
        console.log("login")
        location.reload()
      }, function onError(res){
        console.log("failed to login")
        console.log(res)
      })
    }
  });
})();
