'use strict';

const gitHubService = require('../services/github_service');
const config = require('config');

const viewRoutes = [{
    method: 'GET',
    path: '/view',
    handler: async (request, h) => {
        const pageNumber = request.query.pageno ? request.query.pageno : '1';
        const viewModel = await gitHubService.searchRepo(config.get('search_keyword'), pageNumber);
        viewModel['nextPage'] = viewModel['nextPage']? viewModel['nextPage']: null;
        viewModel['prevPage'] = viewModel['prevPage']? viewModel['prevPage']: null;
        return await h.view('index', { data: viewModel });
    }
}];

module.exports = viewRoutes;