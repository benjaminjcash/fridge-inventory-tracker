const chai = require('chai');
const chaiHttp = require('chai-http');
const { BASE_URL, TEST_ITEM_GET_ID, TEST_ITEM_UPDATE_ID } = require('../config');
chai.use(chaiHttp);
const expect = chai.expect;

describe('Item API service', () => {
    /**
        "_id": "5fb9fd86afda9a050644a01f",
        "name": "Test Item",
        "type": "READ",
        "created_date": "2020-11-22T05:56:22.589Z",
        "__v": 0
     */
    it('should get an item', (done) => {
        chai.request(BASE_URL)
            .get(`/api/item/${TEST_ITEM_GET_ID}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                expect(res.body.data._id).to.be.equal(TEST_ITEM_GET_ID);
                expect(res.body.data.name).to.be.equal("Test Item");
                expect(res.body.data.type).to.be.equal("READ");
                done();
            });
    });

    /**
        "_id": "5fb5e1ef78e6311241f641fc",
        "name": "Test Item",
        "type": "CREATE",
        "created_date": "2020-11-19T03:09:35.229Z",
        "__v": 0
     */
    it('should create an item', (done) => {
        chai.request(BASE_URL)
            .post('/api/item')
            .send({
                name: "Test Item",
                type: "CREATE"
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
        "created_date": "2020-11-22T05:57:14.546Z",
        "__v": 0
     */
    it('should update an item', (done) => {
        chai.request(BASE_URL)
            .get(`/api/item/${TEST_ITEM_UPDATE_ID}`)
            .end((err, res) => {
                expect(res.status).to.be.equal(200);
                let current = parseInt(res.body.data.name);
                let next = current + 1;
                const update = {
                    "name": `${next}`
                }
                chai.request(BASE_URL)
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
        chai.request(BASE_URL)
            .post('/api/item')
            .send({
                name: "Test Item",
                type: "DELETE"
            })
            .end((err, res) => {
                const itemId = res.body._id;
                chai.request(BASE_URL)
                    .delete(`/api/item/${itemId}`)
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        done();
            });
        });
    });
    
});
