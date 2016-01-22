'use strict'

angular.module('config', ['RecursionHelper', 'AtConfigService'])
    .controller('TreeController', ['$scope', 'AtConfigService', function($scope, atConfigService) {
        $scope.config = {
            children: []
        };
        $scope.expandChildren = function(data) {

        };
        $scope.addChildren = function(data) {

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
                onAdd: '&',
                onExpand: '&'
            },
            controller:function ($scope, $attrs) {
                $scope.expandChildren = function (id) {
                    console.log('$scope.expandChildren: ' + id);
                    $scope.onExpand({id:id});
                };
                $scope.addChild = function (id) {
                    console.log('$scope.addChild: ' + id);
                    $scope.onAdd({id:id});
                };
            },
            link: function() {

            },
            compile: function(element) {
                return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {

                })
            }
        }
    })
    .directive('configData', function(RecursionHelper) {
        return {
            scope: {
                config: '=',
                addChild: '&',
                expandChildren: '&'
            }
        }
    });