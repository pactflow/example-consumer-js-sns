# Workshop WIP notes

1. Instruct users to install [LocalStack CLI](https://docs.localstack.cloud/getting-started/installation/#localstack-cli), to test e2e locally with Docker
   1. [Alternative install mechanisms](https://docs.localstack.cloud/getting-started/installation/#alternatives) 
2. Install [aws-local cli](https://docs.localstack.cloud/user-guide/integrations/aws-cli/#localstack-aws-cli-awslocal)
3. Install [aws-sam-cli-local](https://docs.localstack.cloud/user-guide/integrations/aws-sam/)
4. Need Docker
5. Start LocalStack `localstack start -d` (detached mode) remove `-d`  to tail logs (will need more than 1 terminal or tabs)
6. Add PactBroker config
7. Update Provider side
8. Show delta between pact ruby core and pact rust core generated Pact files.

## Consumer side testing

```sh
git clone git@github.com:pactflow/example-consumer-js-sns.git
cd example-consumer-js-sns
npm install
npm run test
docker compose up -d
npm run pact:publish
```

## Provider side verification

```sh
cd ..
git clone git@github.com:pactflow/example-provider-js-sns.git
cd example-provider-js-sns
npm install
PACT_URL=$PWD/../example-consumer-js-sns/pacts/pactflow-example-consumer-js-sns-pactflow-example-provider-js-sns.json make test
PACT_BROKER_BASE_URL=http://localhost:8000 make test
PACT_BROKER_BASE_URL=http://localhost:8000 PACT_PUBLISH_VERIFICATION_RESULTS=true make test
PACT_BROKER_BASE_URL=http://localhost:8000 PACT_PUBLISH_VERIFICATION_RESULTS=true PACT_LOG_LEVEL=debug make test
```