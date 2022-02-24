const chai = require('chai');
const chaiHttp = require('chai-http');
const { TEST_ITEM_GET_ID, TEST_ITEM_UPDATE_ID, TEST_USER_ID } = require('../config');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Item API service', () => {
    /**
        "_id": "5fbaec457ed60f0c05f70da1",
        "name": "test",
        "type": "read",
        "owner": "5fb9fe19f50e130570589732",
        "expiration_date": "2000-01-01T07:00:00.000Z",
        "created_date": "2020-11-22T22:55:01.389Z",
        "__v": 0
     */
    it('should get an item', (done) => {
        chai.request()
            .get(`/api/item/${TEST_ITEM_GET_ID}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data._id).to.be.equal(TEST_ITEM_GET_ID);
                expect(res.body.data.name).to.be.equal("test");
                expect(res.body.data.type).to.be.equal("read");
                expect(res.body.data.owner).to.be.equal(TEST_USER_ID)
                done();
            });
    });

    /**
        "_id": "5fb5e1ef78e6311241f641fc",
        "name": "test",
        "type": "create",
        "expiration_date": '01/01/2020'
        "created_date": "2020-11-19T03:09:35.229Z",
        "__v": 0
     */
    it('should create an item', (done) => {
        chai.request()
            .post('/api/item')
            .send({
                name: "test",
                type: "create",
                expiration_date: '01/01/2020'
            })
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                done();
            });
    });

    /**
        "_id": "5fb9fdbaf174eb0540a47001",
        "name": "0",
        "type": "UPDATE",
        "created_date": "01/01/2000",
        "__v": 0
     */
    it('should update an item', (done) => {
        chai.request()
            .get(`/api/item/${TEST_ITEM_UPDATE_ID}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                let current = parseInt(res.body.data.name);
                let next = current + 1;
                const update = {
                    "name": `${next}`
                }
                chai.request()
                    .put(`/api/item/${TEST_ITEM_UPDATE_ID}`)
                    .send(update)
                    .end((err, res) => {
                        let updated = parseInt(res.body.data.name);
                        expect(updated).to.equal(current + 1);
                        done();
                    });
            });
    });

    

    /**
        "_id": "xxxxxxxxxxxxxxxxxxxxxx",
        "name": "Test Item",
        "type": "DELETE",
        "created_date": "2020-11-19T03:25:52.024Z",
        "__v": 0
     */
    it('should delete an item', (done) => {
        chai.request()
            .post('/api/item')
            .send({
                name: "test",
                type: "delete",
                expiration_date: "01/01/2020"
            })
            .end((err, res) => {
                const itemId = res.body._id;
                chai.request()
                    .delete(`/api/item/${itemId}`)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        done();
            });
        });
    });
    
});
