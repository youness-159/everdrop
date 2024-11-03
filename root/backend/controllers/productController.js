const multer = require("multer");
const sharp = require("sharp");

const factory = require("./handlerFactory");
const Product = require("../models/productModel.js");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { isEmptyObject } = require("../utils/functions");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Not an image! Please upload only images", 415), false);
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImages = upload.array("images", 6);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (typeof req.body.coverImage === "string") {
    req.body.coverImage = (await Product.findById(req.params.id)).coverImage;
  }
  if (!req.files) return next();

  if (req.files[0]) {
    req.body.coverImage = `product-${req.params.id}-${Date.now()}-cover.webp`;
    await sharp(req.files[0].buffer)
      .resize(1500, 1500)
      .webp({ quality: 80 })
      .toFile(`public/imgs/products/${req.body.coverImage}`);
  }

  if (req.files) {
    req.body.images = [];
    await Promise.all(
      req.files.slice(1).map(async (image, i) => {
        const imageName = `product-${req.params.id}-${Date.now()}-${i}.webp`;
        await sharp(image.buffer)
          .resize(1500, 1500)
          .webp({ quality: 80 })
          .toFile(`public/imgs/products/${imageName}`);
        req.body.images.push(imageName);
      }),
    );
  }
  next();
});

exports.getFilters = catchAsync(async (req, res, next) => {
  const [r] = await Product.aggregate([
    {
      $facet: {
        sizes: [
          { $unwind: "$sizes" },
          {
            $group: {
              _id: null,
              uniqueSizes: { $addToSet: "$sizes" },
            },
          },
          { $project: { _id: 0, sizes: "$uniqueSizes" } },
        ],
        colors: [
          { $unwind: "$colors" },
          {
            $group: {
              _id: null,
              uniqueColors: { $addToSet: "$colors" },
            },
          },
          { $project: { _id: 0, colors: "$uniqueColors" } },
        ],
        brands: [
          {
            $group: {
              _id: null,
              uniqueBrands: { $addToSet: "$brand" },
            },
          },
          { $project: { _id: 0, brands: "$uniqueBrands" } },
        ],
      },
    },
  ]);

  if (!r) return next(new AppError("something went wrong !", 500));

  const filters = {
    sizes: r.sizes[0].sizes,
    colors: r.colors[0].colors,
    brands: r.brands[0].brands,
  };

  res.status(200).json({ status: "success", data: filters });
});

exports.getProductsLength = factory.getLengthOf(Product);
exports.getAllProducts = factory.getAll(Product);
exports.getProductById = factory.getOneById(Product, {
  path: "category",
  select: "name",
});
exports.createProduct = factory.createOne(Product);
exports.updateProductById = factory.updateOneById(Product);
exports.deleteProductById = factory.deleteOneById(Product);
