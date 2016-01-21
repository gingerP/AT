var handlers = [
    {path: '/api/config', mod: require('./controllers/ConfigController')}
];

module.exports = {
    init: function(express) {
        handlers.forEach(function(handler) {
            express.use(handler.path, handler.mod.router);
            console.log('%s: Api point "%s" successfully mapped.' , Date(Date.now()), handler.path);
        });
        return this;
    }
};
