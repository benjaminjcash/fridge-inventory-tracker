const Item = require("../models/item.model");

exports.doCreateItem = async (req) => {
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type,
        owner: req.auth.id,
        expiration_date: new Date(req.body.expiration_date)
    });
    return newItem.save()
        .then((data) => {
            return data;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}
exports.doGetItem = async (req) => {
    return Item
            .findById(req.params.itemId)
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetAllItems = async (req) => {
    const { orderby, direction } = req.query;
    return Item
            .find({
                owner: req.auth.id
            })
            .sort({[orderby]: direction})
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doUpdateItem = async (id, body) => {
    return Item
            .findByIdAndUpdate(id, body, { new: true })
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}