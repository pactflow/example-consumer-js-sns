#!/bin/sh

set -e

echo "finding topic"
export REGION=us-east-1
TOPIC_ARN=$(awslocal sns list-topics --output json --region us-east-1 | grep topic| cut -d'"' -f4)
echo "have topic: ${TOPIC_ARN}, publishing message"
TOPIC_ARN=arn:aws:sns:ap-southeast-2:000000000000:topic-447de61c 
awslocal sns publish --region us-east-1 --topic-arn "${TOPIC_ARN}" --message "{\"id\": \"some-uuid-1234-5678\", \"type\": \"Product Range\", \"name\": \"Some Product\", \"event\": \"UPDATED\" }"
npm run logs


export AWS_REGION=ap-southeast-2 
awslocal cloudformation list-stacks --region us-east-1
samlocal logs -n ProductEventHandler --stack-name pactflow-example-consumer-js-sns -t