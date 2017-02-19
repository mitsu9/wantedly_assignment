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

    function likeSkill(user_id, skill_id, login_user_id) {
      var $uri = 'http://127.0.0.1:3000/api/v1/users/' + user_id + '/skills/' + skill_id + '/like';
      var login_user = {"user_id": login_user_id}
      var params = {"user" : login_user}
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
      },
      like: function(id, skill_id, login_user_id) {
        return likeSkill(id, skill_id, login_user_id);
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

    // スキル追加時の処理
    $scope.addSkill = function(){
      console.log("added")
      SkillService.add(id, $scope.skill).then(function onSuccess(res){
        SkillService.update(id).then(function onSuccess(res){
          $scope.skills = res.data;
        })
      });
    };

    // スキルにlikeした際の処理
    $scope.likeSkill = function(index) {
      var skill_id = $scope.skills[index].id
      var login_user_id = $scope.login_user.id
      if (login_user_id == 0) return
      SkillService.like($scope.user.id, skill_id, login_user_id).then(
        function onSuccess(res){
          console.log("success to like")
          SkillService.update(id).then(function onSuccess(res){
            $scope.skills = res.data;
          })
        }, function onError(res){
          console.log(res)
        }
      )
    }

    // ログイン処理
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
