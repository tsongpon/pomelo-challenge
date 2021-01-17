'use strict';

const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');
const { before, after, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/hapi_server');

describe('GET /health', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/health'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with OK payload', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/health'
        });
        expect(res.payload).to.equal("OK");
    });
});