const logger = require("../utils/logger");
const { doCreateProduce } = require("../data/produce.dal");

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