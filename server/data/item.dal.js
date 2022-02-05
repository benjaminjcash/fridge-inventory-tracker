const Item = require("../models/item.model");

exports.doCreateItem = async (req) => {
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type,
        owner: req.auth.id,
        expiration_date: new Date(req.body.expiration_date),
        image_url: req.body.image_url
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
    const { sortby, direction, filterbyname, filterbytype } = req.query;
    let query = {
        $and: [
            {owner: req.auth.id}
        ]
    };
    if(filterbyname) {
        query.$and.push({
            name: {
                $regex: filterbyname,
                $options: "i"
            }
        });
    }
    if(filterbytype && filterbytype.length > 0) {
        let typeFilter = {
            $or: []
        }
        filterbytype.forEach(element => {
            typeFilter.$or.push({
                type: element.id
            });
        });
        query.$and.push(typeFilter);
    }
    return Item
            .find(query)
            .sort({[sortby]: direction})
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