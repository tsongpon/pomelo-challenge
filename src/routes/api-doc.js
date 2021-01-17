'use strict';

const apiDoc = require('../../openApi.json');

const apiDocRoute = [{
    method: 'GET',
    path: '/docs',
    handler: async (request, h) => {
        return apiDoc
    },
}];

module.exports = apiDocRoute;