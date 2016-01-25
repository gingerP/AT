'use strict'

angular.module('config', ['RecursionHelper', 'AtConfigService', 'AtConfigTree', 'ngDraggable'])
    .controller('TreeController', ['$scope', 'AtConfigService', function($scope, atConfigService) {
        $scope.config = {
            children: []
        };
        $scope.expandChildren = function(node) {
            atConfigService.get().then(function(data) {
                node.children.push(data);
                console.log('success');
            });
        };
        $scope.addChild = function(node) {
            atConfigService.get().then(function(data) {
                node.children.push(data);
                console.log('success');
            });
        };
        $scope.openFirstNode = function() {
            atConfigService.get().then(function(data) {
                $scope.config.children.push(data);
                console.log('success');
            });
        };
        /************************************************/
        $scope.onDragStart=function(data,evt){
            console.log("drag start success, data:", data);
        };
        $scope.onDragComplete=function(data,evt){
            console.log("drag success, data:", data);
        };
        $scope.onDropComplete=function(data,evt){
            console.log("drop success, data:", data);
        };
    }]);
