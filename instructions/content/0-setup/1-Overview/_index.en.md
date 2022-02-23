+++
title = "Overview"
weight = 11
+++

The Serverlesspresso application consists of a 3 frontends and a backend application. The frontends are already built and deployed. In this module, you will set up the environment and deploy resources needed to start building your backend.

The backend is a set of serverless microservices. In this section we will set up the following:

* A DynamoDB table containing information about all the rides and attractions throughout the park.
* A Lambda function which performs a table scan on the DynamoDB to return all the items.
* An API Gateway API which creates a public http endpoint for the front-end application to query. This invokes the Lambda function to return a list of rides and attractions.

Once you have built the back-end resources needed, you will update the front-end application configuration to query the API Gateway endpoint and display the information about all the rides and attractions.

Each of the following sections provides an implementation overview and detailed, Step-by-step instructions. Remember: if you have any questions, contact one of the AWS employees located around the room.

{{% notice note %}}
Please ensure you have completed the [Setup Guide](/0-setup.html) first!
{{% /notice %}}
