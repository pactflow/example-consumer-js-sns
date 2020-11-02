const { handler } = require("../product/product.handler");

// Actual lambda handler, responsible for extracting message from SNS
// and dealing with lambda-related things, passing the encoded message along to the
// message handler
const lambda = async (event) => {
  console.info(event);

  // Read the SNS message and pass the contents to the actual message handler
  const results = event.Records.map((e) => handler(JSON.parse(e.Sns.Message)));

  return Promise.all(results);
};

module.exports = {
  lambda,
};
