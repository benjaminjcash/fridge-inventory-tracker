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

const escapeRegex = str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');