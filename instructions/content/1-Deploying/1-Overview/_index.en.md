+++
title = "Overview"
weight = 11
+++

The Serverlesspresso application consists of a 3 frontends and a backend application. The frontends are already built and deployed. In this module, you will set up the environment and deploy resources needed to start building your backend.


[![See Serverlesspresso](/images/se-setup-overview4.png)](https://youtu.be/M6lPZCRCsyA)


In later sections **you will build** the following:
* The *OrderProcessor* microservice - an [AWS Step Functions](https://aws.amazon.com/stepfunctions) Workflow, that orchestrates each customer order from start to completion
* The event routing logic route events to the correct downstream service (consumer).

[![See Serverlesspresso](/images/se-setup-overview5.png)](https://youtu.be/M6lPZCRCsyA)

Once you have built the back-end resources needed, you will update the front-end application configuration to query the API Gateway endpoint and display the information about all the current menu and order status.

Each of the following sections provides an implementation overview and detailed, Step-by-step instructions. Remember: if you have any questions, contact one of the AWS employees located around the room.

{{% notice note %}}
Please ensure you have completed the [Setup Guide](/0-setup.html) first!
{{% /notice %}}
