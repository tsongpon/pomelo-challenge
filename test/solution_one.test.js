'use strict';

const Lab = require('@hapi/lab');
const {expect} = require('@hapi/code');
const {after, before, describe, it} = exports.lab = Lab.script();
const {init} = require('../src/hapi_server');

describe('POST /v1/solution-one', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    const payload = '{"0":\n' +
        '  [{"id": 10,\n' +
        '    "title": "House",\n' +
        '    "level": 0,\n' +
        '    "children": [],\n' +
        '    "parent_id": null}],\n' +
        ' "1":\n' +
        '  [{"id": 12,\n' +
        '    "title": "Red Roof",\n' +
        '    "level": 1,\n' +
        '    "children": [],\n' +
        '    "parent_id": 10},\n' +
        '   {"id": 18,\n' +
        '    "title": "Blue Roof",\n' +
        '    "level": 1,\n' +
        '    "children": [],\n' +
        '    "parent_id": 10},\n' +
        '   {"id": 13,\n' +
        '    "title": "Wall",\n' +
        '    "level": 1,\n' +
        '    "children": [],\n' +
        '    "parent_id": 10}],\n' +
        ' "2":\n' +
        '  [{"id": 17,\n' +
        '    "title": "Blue Window",\n' +
        '    "level": 2,\n' +
        '    "children": [],\n' +
        '    "parent_id": 12},\n' +
        '   {"id": 16,\n' +
        '    "title": "Door",\n' +
        '    "level": 2,\n' +
        '    "children": [],\n' +
        '    "parent_id": 13},\n' +
        '   {"id": 15,\n' +
        '    "title": "Red Window",\n' +
        '    "level": 2,\n' +
        '    "children": [],\n' +
        '    "parent_id": 12}]}'

    const expectedResponse = '[{"id":10,"title":"House","level":0,"children":[{"id":12,"title":"Red Roof","level":1,"children":[{"id":17,"title":"Blue Window","level":2,"children":[],"parent_id":12},{"id":15,"title":"Red Window","level":2,"children":[],"parent_id":12}],"parent_id":10},{"id":18,"title":"Blue Roof","level":1,"children":[],"parent_id":10},{"id":13,"title":"Wall","level":1,"children":[{"id":16,"title":"Door","level":2,"children":[],"parent_id":13}],"parent_id":10}],"parent_id":null}]'

    it('responds with 400 when call with bad payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/solution-one',
            payload: 'i am not json'
        });
        expect(res.statusCode).to.equal(400);
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/solution-one',
            payload: payload
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with correct response payload', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/solution-one',
            payload: payload
        });
        expect(res.payload).to.equal(expectedResponse);
    });

});