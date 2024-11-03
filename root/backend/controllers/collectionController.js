const factory = require("./handlerFactory");
const Collection = require("../models/collectionModel.js");

exports.getAllCollections = factory.getAll(Collection, {
  path: "products",
  select: "_id coverImage name price",
});
exports.getCollectionById = factory.getOneById(Collection);
exports.createCollection = factory.createOne(Collection);
exports.updateCollectionById = factory.updateOneById(Collection);
exports.deleteCollectionById = factory.deleteOneById(Collection);
