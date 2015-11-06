sharedModule.directive('playIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            url:'@',
            data:'@'
        },
        templateUrl: 'partials/widgets/playIcon.html'
      }
    });