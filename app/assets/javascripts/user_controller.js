(function (){
  angular.module('App', [])
  .controller('userCtrl', function ($scope, $http) {
    var id = location.pathname.match(/[1-9]+/);
    var $uri = 'http://127.0.0.1:3000/api/v1/users/' + id + '/skills';
    $http({
        method : 'GET',
        url : $uri
    }).
    then(function onSuccess(response) {
      $scope.skills = response.data;
      console.log(response);
    }, function onError(response) {
      console.log(response);
    });
  });

})();
