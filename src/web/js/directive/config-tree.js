angular.module('AtConfigTree', [])
    .directive('configTree', function(RecursionHelper) {
        return {
            templateUrl: '/static/templates/config-tree.html',
            restrict: 'E',
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
            compile: function(element) {
                return RecursionHelper.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {

                })
            }
        }
    })
    .directive('configData', function(RecursionHelper) {
        return {
            restrict:'E',
            templateUrl: '/static/templates/config-node.html',
            scope: {
                child: '=',
                add: '&',
                expand: '&'
            },
            controller: function($scope, $element) {
                var $container = $('.config-container', $element);
                var $sizeBtn = $('.size-btn', $element);
                function isMax() {
                    return $container.hasClass('max-size');
                }
                $scope.changeSize = function() {
                    if (isMax()) {
                        $container.addClass('min-size').removeClass('max-size');
                        $sizeBtn.html('o');
                    } else {
                        $container.addClass('max-size').removeClass('min-size');
                        $sizeBtn.html('-');
                    }
                };
            },
            link: function(scope, iElement, iAttrs) {

            }
        }
    });