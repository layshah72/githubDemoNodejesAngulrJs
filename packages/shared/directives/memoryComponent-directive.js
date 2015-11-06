sharedModule.directive('memoryIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            content:'@',
            access:'@'
        },
        templateUrl: 'partials/widgets/memoryIcon.html'
      }
    });