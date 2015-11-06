sharedModule.directive('watchIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            content:'@'
        },
        templateUrl: 'partials/widgets/watchIcon.html'
      }
    });