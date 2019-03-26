
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);

describe('GET /jokes/list', function () {
    it('respond with json containing a list of all jokes', function (done) {
        chai.request(server)
            .get('/jokes/list')
            .set('Accept', 'application/json')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(124);
                done();
            });
    });
});

describe('GET /joke', function () {
    it('respond with json containing a joke', function (done) {
        chai.request(server)
            .get('/joke')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    });
});

describe('GET /jokes/all', function () {
    it('404 error should return', function (done) {
        chai.request(server)
            .get('/jokes/all')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});

describe('POST /joke/add', function () {
    let data = {
        "id": "1",
        "joke": "test"
    }
    it('respond with 201 created', function (done) {
        chai.request(server)
            .post('/joke/add')
            .send(data)
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});