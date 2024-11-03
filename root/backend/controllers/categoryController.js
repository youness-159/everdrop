const factory = require("./handlerFactory");
const Category = require("../models/categoryModel.js");

exports.getCategoriesLength = factory.getLengthOf(Category);
exports.getAllCategories = factory.getAll(Category);
exports.getCategoryById = factory.getOneById(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategoryById = factory.updateOneById(Category);
exports.deleteCategoryById = factory.deleteOneById(Category);
