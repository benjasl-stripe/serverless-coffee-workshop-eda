+++
title = "Overview"
weight = 11
+++
[![See Serverlesspresso](/images/play.png)](https://youtu.be/M6lPZCRCsyA)

## Let's get caffeinated!

Serverlesspresso is a pop-up coffee shop that provides premium espresso drinks at conferences and events. The organizers have brought an elite team of the world's best baristas to brew 1,000 drinks a day for customers.

Our job today is help build a serverless application to help them accept orders and notify customers when their drinks are ready. We have to build a robust solution that scales to meet demand, handles the workflow of individual drinks, and authenticates our coffee drinkers.

The coffee bar opens in 2 hours! Good luck!

## Application structure

You will be creating various microservices the integrate existing frontends with your back serverless application. You will be using AWS Step Functions to handle orchestration and Amazon EventBridge to handle choreography.

### Frontend
The frontends are already deployed. Once you have built the backend, you will provide environment variables to the frontends to enable them to connect.

### Backend
The backend application architecture uses [AWS Step Functions](https://aws.amazon.com/step-functions/), [Amazon EventBridge](https://aws.amazon.com/eventbridge/), [AWS Lambda][lambda], [Amazon API Gateway][api-gw], [Amazon S3][s3], [Amazon DynamoDB][dynamodb], and [Amazon Cognito][cognito].

JavaScript executed in the frontend browser application sends and receives data from a backend API built using API Gateway and Lambda. DynamoDB provides a persistence data storage layer which is used by the API's Lambda functions.

See the diagram below for the complete architecture.

![Overall architecture](/images/se-0-architecture.png)


[amplify-console]: https://aws.amazon.com/amplify/console/
[cognito]: https://aws.amazon.com/cognito/
[lambda]: https://aws.amazon.com/lambda/
[api-gw]: https://aws.amazon.com/api-gateway/
[s3]: https://aws.amazon.com/s3/
[dynamodb]: https://aws.amazon.com/dynamodb/