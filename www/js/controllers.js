
angular.module('starter.controllers', [])



.controller('LinkCtrl', function($scope) {

  $scope.links=[
    ['Publications','http://guptabansal.com/publications.html'],

    ['CBSE Class XII','http://sultan-chand.com/shop/?board=CBSE&class=XII&subject=Mathematics&btn=Search'],

    ['CBSE Class XI','http://sultan-chand.com/shop/?board=CBSE&class=XI&subject=Mathematics&btn=Search'],

    ['ISC Class XII','http://sultan-chand.com/shop/?board=ISC&class=XII&subject=Mathematics&btn=Search'],

    ['ISC Class XI','http://sultan-chand.com/shop/?board=ISC&class=XI&subject=Mathematics&btn=Search'],

    ['Facebook','https://www.facebook.com/guptabansalgroup'],

    ['Blogger','http://guptabansal.blogspot.com'],

    ['Visit Our Site','http://guptabansal.com'],

    ['Free Downloads','http://guptabansal.com/downloads.html'],

    ['Brain Teaser','http://guptabansal.com/brainteaser.html'],

    ['Rate Our App','https://play.google.com/store/apps/details?id=com.piexsys.guptabansal.app'],

    ['Contact Us','http://guptabansal.com/contact.aspx'],

  ]


})

.controller("demoController", function($scope,$state, $ionicModal, $timeout,$auth){

  $scope.isAuthenticated = function() {
    console.log($auth.getPayload());
  return $auth.isAuthenticated();

};
  $scope.bd_src='img/bd.png';
  $scope.logo2_src='img/logo2.png';
  $scope.authenticate = function(provider) {
      $auth.authenticate(provider).then(function(response){
        if (provider=='google')
        {
          $auth.setToken(response.config.data);
        }
        $state.go('tab.scanner');
        console.log(response);

      })
      .catch(function(response) {
        console.log(response);
  });
    };
  })
.controller("ProfileController", function($scope, $http, $location , $auth, $state) {

      $scope.init = function() {
        console.log("Here");
          if($auth.isAuthenticated()) {
              $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: $auth.getToken(), fields: "id,name,gender,picture,hometown,location ", format: "json"},width:9999}).then(function(result) {
                console.log(result);
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

      $scope.logout = function()
      {
        $auth.logout();

          $state.go('login');
      };

  })

.controller("BarController", function($scope, $cordovaBarcodeScanner) {

      $scope.scanBarcode = function() {
          $cordovaBarcodeScanner.scan().then(function(imageData) {
                  $scope.img=JSON.stringify(imageData);
          }, function(error) {
              console.log("An error happened -> " + error);
          });
      };

  });
