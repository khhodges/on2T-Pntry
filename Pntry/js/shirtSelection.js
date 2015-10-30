var app = angular.module('shirtSelection', []);

app.controller('colorCtrl', function($scope) {
    $scope.active = 'BLACK';
    $scope.setActive = function(type) {
        $scope.active = type;
    };
    $scope.isActive = function(type) {
        return type === $scope.active;
    };
});