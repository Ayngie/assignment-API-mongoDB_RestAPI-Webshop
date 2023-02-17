const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../utils/errors");

/* --------------------------- GET /api/v1/products - Get all products --------------------------- */

exports.getAllProducts = async (req, res, next) => {
  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query.offset || 0);

  const products = await Product.find().limit(limit).skip(offset);
  console.log(products);

  if (!products)
    throw new NotFoundError("Sorry, there are no products to show.");

  const totalProductsInDatabase = await Product.countDocuments();

  return res.json({
    data: products,
    meta: {
      total: totalProductsInDatabase,
      limit: limit,
      offset: offset,
      count: products.length,
    },
  });
};

/* --------------------------- GET /api/v1/products/productId/ - Get product by id --------------------------- */

exports.getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  const product = await Product.findById(productId);

  if (!product) throw new NotFoundError("This product does not exist");
  return res.json(product);
};
