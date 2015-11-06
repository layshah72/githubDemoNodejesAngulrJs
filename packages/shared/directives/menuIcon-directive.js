sharedModule.directive('menuIcon', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',
            url:'@',
            data:'@'
        },
        templateUrl: 'partials/widgets/menuIcon.html'
      }
    });