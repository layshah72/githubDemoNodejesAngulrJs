sharedModule.directive('bookIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            link:'@'
        },
        templateUrl: 'partials/widgets/bookIcon.html'
      }
    });