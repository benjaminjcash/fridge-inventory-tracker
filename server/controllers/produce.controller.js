const logger = require("../utils/logger");
const { doCreateProduce, doSearchProduce } = require("../data/produce.dal");

exports.createProduce = async (req, res) => {
  try {
    const produce = await doCreateProduce(req);
    if(!produce) {
      return res.json({
        success: false,
        error: "produce not created"
      });
    } else {
      res.json({
        success: true,
        data: produce
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

exports.searchProduce = async (req, res) => {
  try {
    const produce = await doSearchProduce(req);
    if(!produce.length > 0) {
      return res.json({
        success: false,
        error: "produce not found"
      });
    } else {
      res.json({
        success: true,
        data: produce
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