const Item = require("../models/item.model");
const logger = require("../utils/logger");

exports.doCreateItem = async (req) => {
  let newItem;
  if(req.body.product_id) {
    newItem = new Item({
      owner_id: req.auth.id,
      product_id: req.body.product_id,
      expiration_date: new Date(req.body.expiration_date),
    });
  } else if(req.body.produce_id) {
    newItem = new Item({
      owner_id: req.auth.id,
      produce_id: req.body.produce_id,
      expiration_date: new Date(req.body.expiration_date),
    });
  }
  return newItem.save()
    .then((data) => {
      return data;
    }).catch(err => {
      logger.error(err);
      throw err;
    });
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
  const { sortby, direction, filterbyname, filterbytype } = req.query;
  let query = {
    $and: [
      {owner_id: req.auth.id}
    ]
  };
  // if(filterbyname) {
  //   query.$and.push({
  //     name: {
  //       $regex: filterbyname,
  //       $options: "i"
  //     }
  //   });
  // }
  // if(filterbytype && filterbytype.length > 0) {
  //   let typeFilter = {
  //     $or: []
  //   }
  //   filterbytype.forEach(element => {
  //     typeFilter.$or.push({
  //       type: element.id
  //     });
  //   });
  //   query.$and.push(typeFilter);
  // }
  return Item
      .find(query)
      .populate('product_id')
      .populate('produce_id')
      .sort({[sortby]: direction})
      .then((data) => {
        if(filterbyname || filterbytype) {
          data = _filterItemList(data, filterbyname, filterbytype)
        }
        return data;
      }).catch((err) => {
        throw err;
      });
}

const _filterItemList = (data, name, types) => {
  if(name) {
    const re = new RegExp(name.toUpperCase());
    data = data.filter(item => {
      if(item.product_id) {
        return re.test(item.product_id.name.toUpperCase());
      } else if(item.produce_id) {
        return re.test(item.produce_id.name.toUpperCase());
      }
    });
  }
  if(types) {
    let filtered = [];
    types.forEach(type => {
      data.forEach(item => {
        if(item.product_id) {
          if(item.product_id.type === type.id) {
            filtered.push(item);
          }
        } else if(item.produce_id) {
          if(item.produce_id.type === type.id) {
            filtered.push(item);
          }
        }
      });
    });
    return filtered;
  }
  return data;
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

exports.doDeleteItems = async (items) => {
  return Item.deleteMany({ _id: { $in: items}});
}