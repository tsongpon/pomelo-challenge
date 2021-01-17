'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {after, before, describe, it} = exports.lab = Lab.script();
const {init} = require('../src/hapi_server');
const nock = require('nock');
const config = require('config');

describe('Test render view', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
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
                    }
                ]
            }, headers);
        // end
        const res = await server.inject({
            method: 'get',
            url: '/view'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with HTML content', async () => {
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
                    }
                ]
            }, headers);
        // end
        const res = await server.inject({
            method: 'get',
            url: '/view'
        });
        expect(res.headers["content-type"]).to.equal('text/html; charset=utf-8');
    });

    it('responds with correct content', async () => {
        const expectedHTML = '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '\n' +
            '<head>\n' +
            '    <meta charset="UTF-8">\n' +
            '    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            '    <title>Pomelo coding challenges</title>\n' +
            '    <link rel="stylesheet" type="text/css"\n' +
            '          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">\n' +
            '</head>\n' +
            '\n' +
            '<body>\n' +
            '<div class="ui container">\n' +
            '\n' +
            '    <h1 class="ui header">Result</h1>\n' +
            '\n' +
            '    <div class="ui divider"></div>\n' +
            '\n' +
            '    <table class="ui single line table">\n' +
            '        <thead>\n' +
            '        <tr>\n' +
            '            <th>Name</th>\n' +
            '            <th>Create at</th>\n' +
            '            <th>Star</th>\n' +
            '            <th>Owner</th>\n' +
            '        </tr>\n' +
            '        </thead>\n' +
            '        <tbody>\n' +
            '        \n' +
            '            <tr>\n' +
            '                <td>\n' +
            '                    freeCodeCamp\n' +
            '                </td>\n' +
            '                <td>\n' +
            '                    2011-03-07T18:44:25Z\n' +
            '                </td>\n' +
            '                <td>\n' +
            '                    100\n' +
            '                </td>\n' +
            '                <td>\n' +
            '                    tsongpon\n' +
            '                </td>\n' +
            '            </tr>\n' +
            '        \n' +
            '        </tbody>\n' +
            '    </table>\n' +
            '    \n' +
            '    \n' +
            `        <input type="button" onclick="location.href='./view?pageno=2';" value="Next" />\n` +
            '    \n' +
            '<!--    <button>Previous</button>-->\n' +
            '<!--    <button>Next</button>-->\n' +
            '</div>\n' +
            '<script src="https://code.jquery.com/jquery-3.1.1.min.js"\n' +
            '        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>\n' +
            '<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>\n' +
            '</body>\n' +
            '\n' +
            '</html>'

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
                    }
                ]
            }, headers);
        // end

        const res = await server.inject({
            method: 'get',
            url: '/view'
        });
        expect(res.payload).to.equal(expectedHTML);
    });
});