
angular.module('starter.controllers4', [])

.controller("BarController", function($scope,$timeout, $auth,$ionicPopup, $window,$cordovaFileTransfer,$cordovaBarcodeScanner) {

  var sizes={};
  var lMD={};
  var getDetails = function(name)
  {
    $window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory + '/files/pdfs/'+ name , gotFile, fail);

    function fail(e) {
      alert(JSON.stringify(e));
    }

    function gotFile(fileEntry) {

    fileEntry.file(function(file) {

      sizes[name]=Math.round((file.size/1024)/1024);
      lMD[name]=new Date(file.lastModifiedDate);

    });
  }
}
var getSize=function(name)
{
  return sizes[name];
}

var getDate=function(name)
{
  return lMD[name];
}

var deleteFile = function(name)
{
  var confirmPopup = $ionicPopup.confirm({
     title: 'Delete',
     template: 'Are you sure you want to delete this file?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       console.log('Deleted !');
       $window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory + '/files/pdfs/'+ name , gotFile, fail);
     } else {
       console.log('Deletion canceled !');
     }
   });

   function fail(e) {
     alert(JSON.stringify(e));
   }

   function gotFile(fileEntry) {


   fileEntry.remove();
   for( file in $scope.dl)
   {
     if($scope.dl[file].name==name)
     {
       $scope.dl.splice(file,1);
       $scope.$apply()
     }
   }
 }
}

$scope.openPdf=function (name)
{

    $window.open(name,'_system','location=no');
}

$scope.getInfo=function (name)
{

    var showdata=$ionicPopup.show({
    template: '<b>SIZE :</b>'+getSize(name)+" MB<br> "+'<b>DATE :</b>'+getDate(name),
    title: 'Information',
    subTitle: name,
    scope: $scope,
    buttons: [
      { text: 'Close' ,
        type: 'button-balanced',
        onTap: function(e) {
            showdata.close();
        }
    },
      {
        text: '<b>DELETE</b>',
        type: 'button-assertive',
        onTap: function(e) {
            showdata.close();
            deleteFile(name);
        }
      }
    ]
	});
}

  $scope.isDis=false;
  $scope.scanValue="SCAN";
    $scope.dwn=false;
  $scope.show = function() {
    $ionicLoading.show({
      template: '</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){

        $ionicLoading.hide();
  };

      $scope.init=function()
      {

        cordova.plugins.diagnostic.requestRuntimePermission(function(status){
          cordova.plugins.diagnostic.requestRuntimePermission(function(status){
            cordova.plugins.diagnostic.requestRuntimePermission(function(status){

                    }, function(error){
                      console.error("The following error occurred: "+error);
                    }, cordova.plugins.diagnostic.runtimePermission.READ_EXTERNAL_STORAGE);

                  }, function(error){
                    console.error("The following error occurred: "+error);
                  }, cordova.plugins.diagnostic.runtimePermission.WRITE_EXTERNAL_STORAGE);

                }, function(error){
                  console.error("The following error occurred: "+error);
                }, cordova.plugins.diagnostic.runtimePermission.CAMERA);

                $window.resolveLocalFileSystemURL(
                        cordova.file.externalApplicationStorageDirectory + '/files/pdfs/',
                        function (dirEntry) {
                            var dirReader = dirEntry.createReader();

                            dirReader.readEntries(
                                function (entries) {

                                    for(entry in entries)
                                    {
                                      getDetails(entries[entry].name);
                                    }

                                   $scope.dl=entries;
                                   $scope.$apply();
                                },
                                function (err) {
                                    console.log(err);
                                }
                            );

                        },
                        function (err) {
                            console.log(err);
                        }
                    );
      }

      $scope.scanBarcode = function() {

          $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.isDis=true;
            $scope.scanValue="Downloading...";

                  var img=imageData;
                if(!img.cancelled)
                {
                  if(img.text.split('/')[0]=='gbwebzzz000' || img.text.split('/')[0]=='cbse12aid')
                  {
                    getFile(img.text);
                  }
                  else {
                    $scope.isDis=false;
                    $scope.scanValue="SCAN ";

                    $window.open(img.text,'_system');
                      $scope.$apply();
                  }
                }
                else {

                  $ionicPopup.alert({
                    title: 'Abort',
                    template: 'Scan was cancelled ! <br> If it wasn\'t intentional , Please hold the camera steady'

                });

                $scope.isDis=false;
                $scope.scanValue="SCAN ";

                }

          }, function(error) {
              console.log("An error happened -> " + error);
              $scope.isDis=false;
              $scope.scanValue="SCAN";
          });
        //  alert("here2");

      };

      function getFile(url)
      {

        $scope.upload_percentage=0;
        $scope.dwn=false;
        //alert("here67");
        //alert(cordova.file.externalRootDirectory);
        var loc= "http://guptabansal.com/support/"+url;
        //alert(loc);
        var targetPath = cordova.file.externalApplicationStorageDirectory + '/files/pdfs/' + url.split('/').pop();
        //alert(targetPath);
        var trustHosts = true;
        var options = {};
        //alert("herre");
        //alert(loc);
        var transfer=$cordovaFileTransfer.download(loc, targetPath, options, trustHosts);
    transfer.then(function(result) {

      getDetails(url.split('/').pop());
      $scope.dl.push(result);
      $ionicPopup.alert({
        title: 'DOWNLOAD SUCCESSFUL',
        template: 'You can access file from below'

    });

      $scope.upload_percentage=0;
      $scope.isDis=false;
      $scope.scanValue="SCAN ";

      // Success!
    }, function(err) {
      //alert(JSON.stringify(err));
      $ionicPopup.alert({
        title: 'DOWNLOAD FAILED',
        template: JSON.stringify(err)

    });
    $scope.dwn=false;
    $scope.upload_percentage=0;
    $scope.isDis=false;
    $scope.scanValue="SCAN";
    $scope.$apply();
  //  $scope.dwn=true;
      // Error
    }, function (progress) {
       $timeout(function () {
      $scope.dwn=true;
      $scope.upload_percentage = (progress.loaded / progress.total) * 100;
        //$scope.downloadProgress = (progress.loaded / progress.total) * 100;
        });
    });

    $scope.stopDownload=function(){

      transfer.abort();
      $scope.isDis=false;
      $scope.scanValue="SCAN ";
      $scope.$apply();


    }


        return;
      }


  });
