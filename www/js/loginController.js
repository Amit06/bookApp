angular.module('starter.controllers2', [])


.controller("demoController", function($scope,$state,$rootScope, $ionicModal,$window,$auth,$http,$ionicLoading,$ionicPopup){

  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Signing in...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

  $scope.isAuthenticated = function() {
  return $auth.isAuthenticated();
 };
  $scope.bd_src='img/bd.png';
  $scope.logo2_src='img/logo2.png';
  $scope.authenticate = function(provider) {
     $window.localStorage.setItem('key',provider);
    //console.log(  $window.localStorage.getItem('key'));
    $scope.show($ionicLoading);
      $auth.authenticate(provider).then(function(response){
        //console.log(response.config.data.code);
        if (provider==='google')
        {
          var http=$http({
            url: 'https://www.googleapis.com/oauth2/v3/token',
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params:
             {
                client_id: '434562448118-9cqjo5u84v2t8iope9u8sk24cf00cpd8.apps.googleusercontent.com',
                client_secret:'orKNYdkI7BIHjFYZM8zTfXZs',
                redirect_uri: 'http://localhost:8100',
                code: response.config.data.code,
                grant_type: 'authorization_code'
              }
            });
          http.then(function (data) {
      //        alert(data);

              console.log(data);
              var access_token = data.data.access_token;
              var expires_in = data.data.expires_in;
              expires_in = expires_in * 1 / (60 * 60);
              $auth.setToken(access_token);
              if (access_token)
              {
                //  alert($auth.getToken());
                console.log($auth.getToken());
                $scope.hide($ionicLoading);
                $state.go('login');
              }
              else
               {

                 $scope.hide($ionicLoading);
          //       alert("Problem Signing In !")
          $ionicPopup.alert({
            title: 'Login failed!',
            template: 'Please check your credentials!'
        });
               }

          });
          //$auth.setToken(response.config.data);
        }
        else {

          $scope.hide($ionicLoading);
          $state.go('login');

        }


      })
      .catch(function(response) {
        $scope.hide($ionicLoading);
        $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
      });

  });
    };
})
