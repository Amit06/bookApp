angular.module('starter.controllers3', [])

.controller("ProfileController", function($scope,$window,$rootScope, $http, $location , $auth, $state) {

    $scope.init = function() {
      $scope.log = $window.localStorage.getItem('key') ;

        if($scope.log =='facebook'){
        console.log("Here");
          if($auth.isAuthenticated()) {
              $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $auth.getToken(), fields: "id,name,gender,picture,hometown,location ", format: "json"},width:9999}).then(function(result) {

                  $scope.profileData = result.data;

              }, function(error) {
                  alert("There was a problem getting your profile.  Check the logs for details.");
                  console.log(error);
              });
          } else {
              alert("Not signed in");
              $location.path("/login");
          }
        }

        if($scope.log =='google'){
          if($auth.isAuthenticated()) {
            $http({method:"GET", url:"https://www.googleapis.com/plus/v1/people/me?access_token="+$auth.getToken()}).
        success(function(response){
                 console.log(response);
                $scope.param = {
                  provider: 'google',
                    google: {
                                  uid: response["id"],
                                  provider: 'google',
                                  first_name: response["name"]["givenName"],
                                  last_name: response["name"]["familyName"],
                                  email: response.emails[0]["value"],
                                  image: response.image.url
                              }
                  };


        }, function(error) {
        console.log(error);
      });
          } else {
              alert("Not signed in");
              $location.path("/login");
          }
        }

      }

      $scope.logout = function()
      {
          console.log($auth.getToken());
          $auth.logout();
          console.log($auth.getToken());
          $state.go('login');
      };

      $scope.isGoogle = function ()
      {

        return $scope.log=='google';

      }

  })
