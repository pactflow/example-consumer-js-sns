const { receiveProductUpdate } = require("../product/product.service");

// Actual lambda handler, responsible for extracting message from SNS
// and dealing with lambda-related things, passing the encoded message along to the
// message handler
const handler = async (event) => {
  console.info(event);

  // Read the SNS message and pass the contents to the actual message handler
  const updates = event.Records.map((e) =>
    receiveProductUpdate(JSON.parse(e.Sns.Message))
  );

  const results = await Promise.all(updates);

  // Return the current size of the repository
  return results[results.length - 1].size;
};

module.exports = {
  handler,
};
