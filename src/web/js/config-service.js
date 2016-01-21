angular.module('AtConfigService', [])
    .factory('AtConfigService', ['$http', function($http) {
        var api;
        api = {
            get: function() {
                return $http({
                    method: 'POST',
                    url: 'api/config/get'
                }).then(function(response) {
                    return new Promise(function(resolve, reject) {
                        if (response.data.hasOwnProperty('onSuccess')) {
                            resolve(response.data.onSuccess);
                        } else {
                            reject(response.data.onError);
                        }
                    });
                }, function(response) {
                    return new Promise(function(resolve, reject) {
                        reject(response);
                    });
                });
            }
        };
        return api;
    }]);

