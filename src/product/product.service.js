const repository = require("./product.repository");
const Product = require("./product");

// Actual message handler, doesn't care about SNS at all!
const receiveProductUpdate = (product) =>
  Promise.resolve(
    repository.insert(new Product(product.id, product.type, product.name))
  );

module.exports = { receiveProductUpdate };
