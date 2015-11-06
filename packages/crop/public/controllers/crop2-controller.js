cropModule.controller('crop2Controller', function ($scope) {
    $scope.selected = function (cords) {
        var boundx,boundy;
        $scope.cropped = true;
        var rx = 150 / cords.w;
        var ry = 150 / cords.h;
        $('#preview').css({
            width: Math.round(rx * boundx) + 'px',
            height: Math.round(ry * boundy) + 'px',
            marginLeft: '-' + Math.round(rx * cords.x) + 'px',
            marginTop: '-' + Math.round(ry * cords.y) + 'px'
        });
    };
});