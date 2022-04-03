const Item = require("../models/item.model");
const logger = require('../utils/logger');
const { doGetItem, doGetAllItems, doUpdateItem, doCreateItem, doDeleteItems } = require("../data/item.dal");

exports.createItem = async (req, res) => {
    try {
        const item = await doCreateItem(req);
        if(!item) {
            return res.json({
                success: false,
                error: "item not created"
            });
        } else {
            res.json({
                success: true,
                data: item
            });
        }
    }
    catch(err) {
        logger.error(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.getAllItems = async (req, res) => {
    try {
        const items = await doGetAllItems(req);
        if(items.length == 0) {
            return res.json({
                success: false,
                error: "no records found"
            });
        } else {
            res.json({
                success: true,
                data: items
            });
        }
    }
    catch(err) {
        logger.error(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.getItem = async (req, res)  => {
    try {
        const item = await doGetItem(req);
        if(item == null) {
            return res.json({
                success: false,
                error: "no record found"
            });
        } else {
            res.json({
                success: true,
                data: item
            });
        }
    }
    catch(err) {
        logger.error(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.updateItem = async (req, res) => {
    try {
        const item = await doUpdateItem(req.params.itemId, req.body);
        if(item == null) {
            return res.json({
                success: false,
                error: "no record found"
            });
        } else {
            res.json({
                success: true,
                data: item
            });
        }
    }
    catch(err) {
        logger.error(err);
        res.send({
            success: false,
            error: err
        });
    }
}

exports.deleteItems = async (req, res) => {
  try {
    const result = await doDeleteItems(req.body);
    if(!result.deletedCount < 0) {
      return res.json({
        success: false,
        error: "no record(s) found"
      });
    } else {
      res.json({
        success: true,
        deletedCount: result.deletedCount
      });
    }
  }
  catch(err) {
    logger.error(err);
    res.json({
      success: false,
      error: err
    })
  }
  
}
