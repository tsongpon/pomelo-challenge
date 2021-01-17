'use strict';

const axios = require('axios');
const parse = require('parse-link-header');
const config = require('config');

exports.searchRepo = async (keyword, pageNumber=1) => {
    const result = {};
    try {
        const url = `${config.get('github_api_base_url')}/search/repositories?q=${keyword}&per_page=${config.get('page_size')}&sort=stars&order=desc&page=${pageNumber}`
        const response = await axios.get(url);
        const paginationLinks = response.headers['link'];
        const paginationInfo = parse(paginationLinks);
        result['items'] = response.data['items'];
        result['nextPage'] = paginationInfo['next']? paginationInfo['next']['page']: null;
        result['prevPage'] = paginationInfo['prev']? paginationInfo['prev']['page']: null;
    } catch (e) {
        const errorMessage = `There was error while calling Github's API: ${e['response']['data']['message']}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
    }

    return result;
}
