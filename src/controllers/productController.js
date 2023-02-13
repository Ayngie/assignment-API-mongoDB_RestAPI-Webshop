//controllers är kopplat till vårt REST-API-design (våra endpoints) - logik för routes för våra requests
//models är databasdesign - ska följa vad som är bäst för databasen
//dessa två kan se helt olika ut

//CRUD Product:

const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../utils/errors");

// GET /api/v1/products/ - Get all products
exports.getAllProducts = async (req, res, next) => {
  // try {
  //   return res.send("Get all products"); //scaffold return m meddelande
  // } catch (error) {
  //   console.error(error);
  //   return res.status(500).json({
  //     message: error.message,
  //   });
  // }

  const limit = Number(req.query?.limit || 10);
  const offset = Number(req.query.offset || 0);
  const products = await Product.find().limit(limit).skip(offset);
  const totalProductsInDatabase = await Product.countDocuments();
  console.log(products);

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

// GET /api/v1/products/productId/ - Get product by id
exports.getProductById = async (req, res, next) => {
  try {
    return res.send("Get product by ID"); //scaffold return m meddelande
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
