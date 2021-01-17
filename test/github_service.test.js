'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {describe, it} = exports.lab = Lab.script();
const nock = require('nock');
const config = require('config');

const githubService = require('../src/services/github_service')

describe('Test gitgub service', () => {
    it('return github repository with only next page when call for page 1', async () => {
        // intercept github's API call and return mock response
        const headers = {
            Link: '<https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=2>; rel="next", <https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=100>; rel="last"'
        }
        const scope = nock(config.get('github_api_base_url'))
            .get('/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=1')
            .reply(200, {
                items: [
                    {
                        name: "freeCodeCamp",
                        created_at: "2011-03-07T18:44:25Z",
                        stargazers_count: 100,
                        owner: {login: "tsongpon"}
                    },
                    {
                        name: "nodemon",
                        created_at: "2020-03-07T18:44:25Z",
                        stargazers_count: 990,
                        owner: {login: "tsongpon"}
                    }
                ]
            }, headers);
        // end

        const result = await githubService.searchRepo("nodejs", 1);
        expect(result).to.equal({items: [
                {
                    name: "freeCodeCamp",
                    created_at: "2011-03-07T18:44:25Z",
                    stargazers_count: 100,
                    owner: {login: "tsongpon"}
                },
                {
                    name: "nodemon",
                    created_at: "2020-03-07T18:44:25Z",
                    stargazers_count: 990,
                    owner: {login: "tsongpon"}
                }
            ], nextPage: '2', prevPage: null});
    });

    it('return github repository with only previous page when call for last page', async () => {
        // intercept github's API call and return mock response
        const headers = {
            Link: '<https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=99>; rel="prev", <https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=1>; rel="first"'
        }
        const scope = nock(config.get('github_api_base_url'))
            .get('/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=100')
            .reply(200, {
                items: [
                    {
                        name: "freeCodeCamp",
                        created_at: "2011-03-07T18:44:25Z",
                        stargazers_count: 100,
                        owner: {login: "tsongpon"}
                    },
                    {
                        name: "nodemon",
                        created_at: "2020-03-07T18:44:25Z",
                        stargazers_count: 990,
                        owner: {login: "tsongpon"}
                    }
                ]
            }, headers);
        // end

        const result = await githubService.searchRepo("nodejs", 100);
        expect(result).to.equal({items: [
                {
                    name: "freeCodeCamp",
                    created_at: "2011-03-07T18:44:25Z",
                    stargazers_count: 100,
                    owner: {login: "tsongpon"}
                },
                {
                    name: "nodemon",
                    created_at: "2020-03-07T18:44:25Z",
                    stargazers_count: 990,
                    owner: {login: "tsongpon"}
                }
            ], nextPage: null, prevPage: '99'});
    });

    it('return github repository with previous page and next page when call for page 2', async () => {
        // intercept github's API call and return mock response
        const headers = {
            Link: '<https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=1>; rel="prev", <https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=3>; rel="next", <https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=100>; rel="last", <https://api.github.com/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=1>; rel="first"'
        }
        const scope = nock(config.get('github_api_base_url'))
            .get('/search/repositories?q=nodejs&per_page=10&sort=stars&order=desc&page=2')
            .reply(200, {
                items: [
                    {
                        name: "freeCodeCamp",
                        created_at: "2011-03-07T18:44:25Z",
                        stargazers_count: 100,
                        owner: {login: "tsongpon"}
                    },
                    {
                        name: "nodemon",
                        created_at: "2020-03-07T18:44:25Z",
                        stargazers_count: 990,
                        owner: {login: "tsongpon"}
                    }
                ]
            }, headers);
        // end

        const result = await githubService.searchRepo("nodejs", 2);
        expect(result).to.equal({items: [
                {
                    name: "freeCodeCamp",
                    created_at: "2011-03-07T18:44:25Z",
                    stargazers_count: 100,
                    owner: {login: "tsongpon"}
                },
                {
                    name: "nodemon",
                    created_at: "2020-03-07T18:44:25Z",
                    stargazers_count: 990,
                    owner: {login: "tsongpon"}
                }
            ], nextPage: '3', prevPage: '1'});
    });
});