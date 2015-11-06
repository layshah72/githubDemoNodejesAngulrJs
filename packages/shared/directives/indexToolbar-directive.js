sharedModule.directive('indexToolbar', function(){
      return {
        restrict: 'E',
        scope:  {
            src:'@',//pass as reference and if == value is passed(not clear)
            url:'@',
            data:'@'
        },
        templateUrl: 'partials/widgets/indexToolbar.html'
      }
    });