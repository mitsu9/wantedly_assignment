(function (){
  var app = angular.module('App', [])
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
  app.controller('userCtrl', function($scope, SkillService) {
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
  });
})();
