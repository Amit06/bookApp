angular.module('starter.controllers1', [])



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

  $scope.openLink=function(link)
  {
    $window.open(link,'_system');
  }


})
