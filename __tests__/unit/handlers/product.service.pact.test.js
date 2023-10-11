const {
  Matchers,
  MessageConsumerPact,
  asynchronousBodyHandler,
} = require("@pact-foundation/pact");
const {
  receiveProductUpdate,
} = require("../../../src/product/product.service");
const { like, term } = Matchers;

const path = require("path");

describe("product event handler", () => {
  const messagePact = new MessageConsumerPact({
    consumer: "pactflow-example-consumer-js-sns",
    dir: path.resolve(process.cwd(), "pacts"),
    pactfileWriteMode: "update",
    provider: process.env.PACT_PROVIDER
      ? process.env.PACT_PROVIDER
      : "pactflow-example-provider-js-sns",
    logLevel: "info",
  });

  describe("receive a product update", () => {
    it("accepts a product event", () => {
      return messagePact
        .expectsToReceive("a product event update")
        .withContent({
          id: like("some-uuid-1234-5678"),
          type: like("Product Range"),
          name: like("Some Product"),
          event: term({
            generate: "UPDATED",
            matcher: "^(CREATED|UPDATED|DELETED)$",
          }),
        })
        .withMetadata({
          topic: "products",
        })
        .verify(asynchronousBodyHandler(receiveProductUpdate));
    });
  });
});
