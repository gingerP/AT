var utils = require('../utils');
var express = require('express');
var router = express.Router();
var controller;
var config = {
    name: 'name',
    selector: 'selector',
    handler: 'data_handler',
    attribute: 'data_attr',
    style: 'data_style',
    formatter: 'formatter',
    children: []
};
ConstructorController = function() {};
ConstructorController.prototype.get = function(req, res, callback) {
    callback(config);
};

controller = new ConstructorController();
console.log('%s: MAPPING to "ConstructorController" controller.' , Date(Date.now()));
utils.linkRequestsToModule([
    {path: '/get', method: 'get', async: true}
], controller, router, 'post');
module.exports = {
    router: router,
    class: ConstructorController,
    instance: controller
};