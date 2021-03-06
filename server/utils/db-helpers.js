const User = require("../models/user.model");
const Item = require("../models/item.model");

// Auth
exports.doRegisterUser = async (newUser) => {
    return newUser
            .save()
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}

// User
exports.doGetUser = async (username) => {
    return User
            .findOne({ username })
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}
exports.doGetUserWithPassword = async (username) => {
    return User
            .findOne({ username }, '+password')
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}

// Item
exports.doCreateItem = async (req) => {
    const newItem = new Item({
        name: req.body.name,
        type: req.body.type,
        owner: req.auth.id
    });
    newItem.save()
        .then((data) => {
            return data;
        }).catch(err => {
            throw err;
        })
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
    return Item
            .find({
                owner: req.auth.id
            })
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