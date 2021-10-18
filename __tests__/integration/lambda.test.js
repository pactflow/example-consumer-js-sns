const service = require("../../src/product/product.service");
const repository = require("../../src/product/product.repository");

describe("lambda function integrated test", function () {
  it("consumes a valid SNS event", async () => {
    // (1) Arrange
    // First we want mock out the actual low level handling code
    // we want to test the lambda interface here is plumbed correctly to the implementation code
    const spy = jest.spyOn(service, "receiveProductUpdate");
    const { handler } = require("../../src/lambda/product");
    const nrProducts = (await repository.fetchAll()).length;

    // This is an example SNS message we can use to test the interface
    const payload = require("../events/update.json");

    // (2) Act: call the actual lambda with a valid SNS message
    const res = await handler(payload);

    // (3) Assert: should return
    expect(res).toBe(nrProducts + 1);

    // Assert: check that the implementation code was invoked
    // if it gets here, it also meant it didn't encounter any issues
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
