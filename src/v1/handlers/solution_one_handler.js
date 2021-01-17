'use strict';

const solutionOneService = require('../../services/solution_one_service');

exports.solutionOneHandler = async (request, h) => {
    const payload = request.payload;
    const result = solutionOneService.process(payload);

    return h.response([result]).code(200);
}