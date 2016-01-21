'use strict'

angular.module('config', ['RecursionHelper', 'AtConfigService'])
    .controller('TreeController', ['$scope', 'AtConfigService', function($scope, atConfigService) {
        $scope.config = {
            children: []
        };
        $scope.expandChildren = function(event) {

        };
        $scope.addChildren = function(event) {

        };
        $scope.openFirstNode = function() {
            atConfigService.get().then(function(data) {
                $scope.config.children.push(data);
                console.log('success');
            });
        }
    }])
    .directive('configTree', function(RecursionHelper) {
        return {
            templateUrl: '/static/templates/config-node.html',
            scope: {
                config: '=',
                add: '&onAdd',
                expand: '&onExpand'
            },
            compile: function(element) {
                return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {

                })
            }
        }
    });