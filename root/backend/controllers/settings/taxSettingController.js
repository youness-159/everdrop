const handleFactory = require("../handlerFactory");
const TaxSetting = require("../../models/settings/taxSettingModel");

exports.getAllTaxes = handleFactory.getAll(TaxSetting);
exports.getTaxById = handleFactory.getOneById(TaxSetting);
exports.createTax = handleFactory.createOne(TaxSetting);
exports.updateTaxById = handleFactory.updateOneById(TaxSetting);
exports.deleteTaxById = handleFactory.deleteOneById(TaxSetting);
