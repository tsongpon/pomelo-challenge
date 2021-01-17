'use strict';

const solutionOneHandler = require('../handlers/solution_one_handler');
const joi = require('joi');

const solutionOneRoutes = [{
    method: 'POST',
    path: '/v1/solution-one',
    handler: solutionOneHandler.solutionOneHandler,
    options: {
        validate: {
            payload: joi.object()
        }
    }
}]

module.exports = solutionOneRoutes;