sharedModule.directive('videoIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            posterURL2:'@',
            vedioURL2:'@',
            content:'@' ,
            VASTUrl:'@'           
        },
        templateUrl: 'partials/widgets/videoIcon.html'
      }
    });