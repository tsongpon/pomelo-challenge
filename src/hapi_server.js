'use strict';

const Hapi = require('@hapi/hapi');

const healthCheckRoutes = require('./routes/health');
const solutionOneRoutesV1 = require('./v1/routes/solution_one');
const viewRoutes = require('./routes/view');
const apiDocRoute = require('./routes/api-doc')

const server = Hapi.server({
    port: 3000,
    host: '0.0.0.0',
});

server.route(healthCheckRoutes);
server.route(apiDocRoute);
server.route(solutionOneRoutesV1);
server.route(viewRoutes);

const start = async () => {
    const server = Hapi.server({
        port: 3000,
        host: '0.0.0.0',
    });

    await server.register(require('@hapi/vision'));
    server.views({
        engines: {
            ejs: require('ejs'),
        },
        relativeTo: __dirname,
        path: 'templates',
    });

    server.route(healthCheckRoutes);
    server.route(apiDocRoute);
    server.route(solutionOneRoutesV1);
    server.route(viewRoutes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

exports.init = async () => {
    try {
        await registerView()
    } catch (e){
        // Intentional, this init function for automate testing purpose
    }
    await server.initialize();
    return server;
};

exports.start = async () => {
    await registerView()
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

const registerView = async () => {
    await server.register(require('@hapi/vision'));
    server.views({
        engines: {
            ejs: require('ejs'),
        },
        relativeTo: __dirname,
        path: 'templates',
    });
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
