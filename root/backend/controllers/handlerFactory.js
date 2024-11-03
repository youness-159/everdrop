const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/APIFeatures");
const catchAsync = require("../utils/catchAsync");
const { isEmptyObject } = require("../utils/functions");

exports.getAll = (Modal, popOptions) =>
  catchAsync(async (req, res, next) => {
    let data = new APIFeatures(Modal, req.query).filter().sort().paginate();
    data = data.query;

    if (popOptions) data = data.populate(popOptions);

    data = await data;
    if (!data) return next(new AppError("no data found !", 404));

    res.status(200).json({ status: "success", data: data });
  });

exports.getOneById = (Modal, popOptions) =>
  catchAsync(async (req, res, next) => {
    let data = Modal.findById(req.params.id);
    if (!data) return next(new AppError("no data found !", 404));

    if (popOptions) data = data.populate(popOptions);
    data = await data;
    res.status(200).json({ status: "success", data });
  });

exports.createOne = (Modal) =>
  catchAsync(async (req, res, next) => {
    const data = await Modal.create(req.body);
    if (!data) return next(new AppError("creation failed !", 400));

    res.status(200).json({ status: "success", data });
  });

exports.updateOneById = (Modal) =>
  catchAsync(async (req, res, next) => {
    function sanitizate(body) {
      const sanitizations = ["password", "createdAt", "role"];
      sanitizations.forEach((el) => body[el] && delete body[el]);
      return body;
    }

    const data = await Modal.findByIdAndUpdate(
      req.params.id,
      sanitizate(req.body),
    );
    if (!data) return next(new AppError("updating failed !", 400));

    res.status(200).json({ status: "success", data });
  });

exports.deleteOneById = (Modal) =>
  catchAsync(async (req, res, next) => {
    const data = await Modal.findByIdAndDelete(req.params.id);
    if (!data) return next(new AppError("updating failed !", 400));

    res.status(200).json({ status: "success", data: null });
  });

exports.getLengthOf = (Model) =>
  catchAsync(async (req, res, next) => {
    const stats = await Model.aggregate([
      {
        $group: {
          _id: null,
          sum: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ status: "success", data: stats[0]?.sum || 0 });
  });
