const handleFactory = require("../handlerFactory");
const PaymentSetting = require("../../models/settings/PaymentSettingModel");

exports.getAllPaymentSettings = handleFactory.getAll(PaymentSetting);
exports.getPaymentSettingById = handleFactory.getOneById(PaymentSetting);
exports.createPaymentSetting = handleFactory.createOne(PaymentSetting);
exports.updatePaymentSettingById = handleFactory.updateOneById(PaymentSetting);
exports.deletePaymentSettingById = handleFactory.deleteOneById(PaymentSetting);
