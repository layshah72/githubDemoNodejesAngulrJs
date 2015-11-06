sharedModule.directive('deviceIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            url:'@',
            data:'@'
        },
        templateUrl: 'partials/widgets/deviceIcon.html'
      }
    });