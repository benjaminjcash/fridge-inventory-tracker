const { doCreateCommonItem, doSearchCommonItems } = require("../data/commonItem.dal");

exports.createCommonItem = async (req, res) => {
    try {
        const commonItem = await doCreateCommonItem(req);
        if(!commonItem) {
            return res.json({
                success: false,
                error: "common item not created"
            });
        } else {
            res.json({
                success: true,
                data: commonItem
            });
        }
    }
    catch(err) {
        console.log(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.searchCommonItems = async (req, res) => {
    try {
        const commonItems = await doSearchCommonItems(req);
        if(commonItems.length == 0) {
            return res.json({
                success: false,
                error: "no records found"
            });
        } else {
            res.json({
                success: true,
                data: commonItems
            });
        }
    }
    catch(err) {
        console.log(err);
        res.send({
            success: false,
            error: err
        });
    }
}
