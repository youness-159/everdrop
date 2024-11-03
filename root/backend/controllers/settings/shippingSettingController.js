const handleFactory = require("../handlerFactory");
const ShippingSetting = require("../../models/settings/shippingSettingModel");

exports.getAllShippingSettings = handleFactory.getAll(ShippingSetting);
exports.getShippingSettingById = handleFactory.getOneById(ShippingSetting);
exports.createShippingSetting = handleFactory.createOne(ShippingSetting);
exports.updateShippingSettingById =
  handleFactory.updateOneById(ShippingSetting);
exports.deleteShippingSettingById =
  handleFactory.deleteOneById(ShippingSetting);
