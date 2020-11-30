const CommonItem = require("../models/commonItem.model");
const commonItems = require("../config/commonItems.config");

exports.hydrateCommonItems = async () => {
    CommonItem.deleteMany({}).then((res) => {
        CommonItem.insertMany(commonItems).then((res) => {
            console.log(`Inserted ${res.length} Common Items into the Database.`)
        })
        .catch((err) => {
            console.error(err);
        })
    })
    .catch((err) => {
        console.error(err);
    })
}