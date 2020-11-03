const service = require("../../src/product/product.service");

describe("lambda function integrated test", function () {
  it("consumes a valid SNS event", async () => {
    // Arrange
    // First we want mock out the actual low level handling code
    // we want to test the lambda interface here is plumbed correctly to the implementation code
    const spy = jest.spyOn(service, "receiveProductUpdate");
    const { handler } = require("../../src/lambda/product");

    // This is an example SNS message we can use to test the interface
    const payload = {
      Records: [
        {
          EventSource: "aws:sns",
          EventVersion: "1.0",
          EventSubscriptionArn: "arn:aws:sns:us-east-1::ExampleTopic",
          Sns: {
            Type: "Notification",
            MessageId: "95df01b4-ee98-5cb9-9903-4c221d41eb5e",
            TopicArn: "arn:aws:sns:us-east-1:123456789012:ExampleTopic",
            Subject: "example subject",
            Message:
              '{"id": "some-uuid-1234-5678", "type": "Product Range", "name": "Some Product", "event": "UPDATED" }',
            Timestamp: "1970-01-01T00:00:00.000Z",
            SignatureVersion: "1",
            Signature: "EXAMPLE",
            SigningCertUrl: "EXAMPLE",
            UnsubscribeUrl: "EXAMPLE",
            MessageAttributes: {
              Test: {
                Type: "String",
                Value: "TestString",
              },
              TestBinary: {
                Type: "Binary",
                Value: "TestBinary",
              },
            },
          },
        },
      ],
    };

    // Act: call the actual lambda with a valid SNS message
    const res = await handler(payload);

    // Assert: check that the implementation code was invoked
    // if it gets here, it also meant it didn't encounter any issues
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
