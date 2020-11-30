const CommonItem = require("../models/commonItem.model");

exports.doCreateCommonItem = async (req) => {
    const newCommonItem = new CommonItem({
        name: req.body.name,
        type: req.body.type,
        shelf_life: req.body.shelf_life,
        image_url: req.body.image_url
    });
    return newCommonItem.save()
        .then((data) => {
            return data;
        }).catch(err => {
            console.log(err);
            throw err;
        });
}

exports.doSearchCommonItems = async (req) => {
    const { name } = req.query;
    let query = { 
        name: { 
            $regex: name, 
            $options: "i" 
        } 
    }
    return CommonItem
            .find(query)
            .then((data) => {
                return data;
            }).catch((err) => {
                throw err;
            });
}