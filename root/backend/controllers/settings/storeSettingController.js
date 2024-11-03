const handleFactory = require("../handlerFactory");
const StoreSetting = require("../../models/settings/storeSettingModel");

exports.getAllStoreSettings = handleFactory.getAll(StoreSetting);
exports.getStoreSettingById = handleFactory.getOneById(StoreSetting);
exports.createStoreSetting = handleFactory.createOne(StoreSetting);
exports.updateStoreSettingById = handleFactory.updateOneById(StoreSetting);
exports.deleteStoreSettingById = handleFactory.deleteOneById(StoreSetting);
