const logger = require("../utils/logger");
const { doCreateProduce, doSearchProduce, doFetchAllProduces, doUpdateProduce, doDeleteProduce } = require("../data/produce.dal");

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

exports.fetchAllProduces = async (req, res) => {
  try {
    const produces = await doFetchAllProduces(req);
    if(produces.length == 0) {
      return res.json({
          success: false,
          error: "no records found"
      });
    } else {
      res.json({
          success: true,
          data: produces
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

exports.updateProduce = async (req, res) => {
  try {
      const produce = await doUpdateProduce(req.params.produceId, req.body);
      if(produce == null) {
          return res.json({
              success: false,
              error: "no record found"
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

exports.deleteProduce = (req, res) => {
  doDeleteProduce(res, req.params.produceId);
}