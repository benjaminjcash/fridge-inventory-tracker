const Produce = require("../models/produce.model");
const logger = require("../utils/logger");

exports.doCreateProduce = async (req) => {
  const newProduce = new Produce({
    name: req.body.name,
    type: req.body.type,
    image_url: req.body.imageUrl,
    shelf_life : req.body.shelfLife
  });
  return newProduce.save()
    .then((data) => {
      return data;
    }).catch(err => {
      logger.error(err);
      throw err;
    });
}

exports.doSearchProduce = async (req) => {
  const { name } = req.params;
  const regex = new RegExp(`${escapeRegex(name)}`);
  let query = {
    name: regex
  };
  return Produce
      .find(query)
      .then((data) => {
        return data;
      }).catch((err) => {
        throw err;
      });
}

exports.doFetchAllProduces = async (req) => {
  return Produce
      .find()
      .then((data) => {
        return data;
      }).catch((err) => {
        throw err;
      });
}

exports.doUpdateProduce = async (id, body) => {
  return Produce
    .findOneAndUpdate({ _id: id }, body)
    .then((data) => {
      return data;
    }).catch((err) => {
      throw err;
    });
}

exports.doDeleteProduce = async (res, id) => {
  Produce.findByIdAndDelete(id)
  .then(() => {
      res.json({
          success: true,
          message: "deleted successfully"
      });
  }).catch(err => {
      res.send(err);
  });
}

const escapeRegex = str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');