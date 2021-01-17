'use strict';

const healthCheck = require('../handlers/health_check');

const healthCheckRoute = [{
    method: 'GET',
    path: '/health',
    handler: healthCheck.healthCheckHandler,
}];

module.exports = healthCheckRoute;