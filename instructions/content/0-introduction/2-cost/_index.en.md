+++
title = "Cost"
weight = 12
+++

If you are completing this workshop at an AWS event, you are provided with a temporary AWS account and there is no cost to you. The resources will be automtically deleted after the workshop, so you do not need to perform any clean up.

If you are deploying this workshop in your own AWS account, you will be responsible for the costs incurred by the application. Most of the service usage is covered by the [AWS Free Tier](https://aws.amazon.com/free/) for eligible accounts. To minimize ongoing cost after the workshop, follow the steps in the *Clean up* section to delete resources.

If run in production for 1,000 customers a day, the expected costs for running the application are:

Service | Daily cost | With AWS Free Tier
------------ | ------------- | -------------
AWS Amplify Console | $0.28 | Free
Amazon API Gateway | $0.01 | Free
Amazon Cognito | Free | Free
Amazon DynamoDB | $0.01 | Free
Amazon EventBridge | $0.01 | Free
AWS IoT Core | $0.01 | Free
AWS Lambda | $0.01 | Free
Amazon SNS* | $7.98 | $7.98
AWS Step Functions | $0.29 | Free

In this example, the Amazon SNS cost includes the cost of 1,000 SMS messages to global cellular numbers.

You are using an account provided by AWS so there are no AWS costs for you in this case.
