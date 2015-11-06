cropModule.controller('crop3Controller', ['$scope','cropService','indexService', function($scope,cropService,indexService){
    /**
 * Created by ezgoing on 14/9/2014.
 */
            var options =
            {
                imageBox: '.imageBox',
                thumbBox: '.thumbBox',
                spinner: '.spinner',
                imgSrc: '/images/avatar.png'
            }  
            var cropper = cropService.getCropperObject(options);
            document.querySelector('#file').addEventListener('change', function(){
                var reader = new FileReader();
                reader.onload = function(e) {
                    options.imgSrc = e.target.result;
                    cropper = cropService.getCropperObject(options);
                }
                reader.readAsDataURL(this.files[0]);
                this.files = [];
            })
            // $scope.savecropdata =function(){
            //     alert("hi");
            //     cropService.saveCropImg(cropper);
            //     console.log(cropService.getCropImg());
            // }
             document.querySelector('#btnCrop').addEventListener('click', function(){
                    
                var cropFlag=window.location.href;
                if(!(cropFlag.indexOf("crop3")>-1)){    
                    cropService.saveCropImg(cropper);

                    console.log(cropService.getCropImg());
                }
                else{
                    var img = cropper.getDataURL();
                    document.querySelector('.cropped').innerHTML += '<img src="'+img+'">';

                    var  promiseGetAccount= indexService.account();//promise allows synchronous loading for after data come
                    promiseGetAccount.$promise.then(function(data) {
                        $scope.firstName=data.user.userName;
                        $scope.showfirstName=true;
                        var user_info_id;
                        user_info_id=data.user.user_info_id;
                        console.log("user_info_id is"+user_info_id+" and data is"+data);
                        cropService.saveImage(user_info_id,img);
                        
                        
                    },function(reason) {
                            $scope.message = reason;
                            console.log(reason);
                    });
        
                }
              
            })
            document.querySelector('#btnZoomIn').addEventListener('click', function(){
                cropper.zoomIn();
            })
            document.querySelector('#btnZoomOut').addEventListener('click', function(){
                cropper.zoomOut();
            })
            
}]);