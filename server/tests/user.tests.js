const chai = require('chai');
const chaiHttp = require('chai-http');
const { BASE_URL, TEST_USER_ID } = require('../config');
chai.use(chaiHttp);
const expect = chai.expect;

describe('User API service', () => {
    /**
        "username": "admin",
        "password": "admin",
        "name": "admin",
        "email": "admin"
     */
    it('should get a user', (done) => {
        chai.request(BASE_URL)
            .get('/api/user/me')
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.success).to.be.equal(true);
                expect(res.body.data._id).to.be.equal(TEST_USER_ID);
                expect(res.body.data.username).to.be.equal('admin');
                expect(res.body.data.name).to.be.equal('admin');
                expect(res.body.data.email).to.be.equal('admin');
                done()
            });
    });
});
