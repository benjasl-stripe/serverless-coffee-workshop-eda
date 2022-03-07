+++
title = "Frontends"
weight = 12
+++

## Overview

The frontends enables customers and barista to interact with the backend application. There are 3 frontend applications:

* **Display App**: displays the QR code and upcoming/completed drinks orders.
* **Barista App**: allows the barista to complete and cancel orders as they arrive.
* **Customer App**: enables customers to place and cancel drinks orders.

In this module, you will set up each of these frontends, so you can perform an end-to-end test of your backend application.

## How it works

* The frontend applications use Amazon Cognito to allow customers to register and sign-in to their accounts. The backend uses the same Cognito configuration to identify users.
* The frontends use API Gateway endpoints to communicate with key services.
* They also use a WebSocket connection to AWS IoT Core to receive real-time messages. You will set this up in the next module.

## Finding the settings

The settings for all three applications are the same but you must configure each individually.

1. You will need the outputs that you saved from the core deployment in the *Setup* module. If you have these, skip ahead to the next section, otherwise continue.

2. You can fetch the outputs from the CloudFormation stack deployed by AWS SAM. Navigate to the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/home). Make sure that the Region is the same.

3. Select the *Stacks* menu on the left, then choose the *Stack name* *serverlesspresso-backend*.

![CloudFormation stacks](/images/se-mod3-backend-display2.png)

4. Select the *Outputs* tab. This displays the resource names and values needed for the front-end configuration settings.

![CloudFormation stack outputs](/images/se-mod3-backend-display3.png)

Wherever the instructions reference the "Key" names, enter the corresponding "Value". The values unique identify resources in your backend stack.

## Configure the frontends

There are three parts to this module:

1. [Configure the Display App](./2-frontends/1-displayapp.html)
2. [Configure the Barista App](./2-frontends/2-baristaapp.html)
3. [Configure the Customer App](./2-frontends/3-customerapp.html)

To start the first section, [click here to continue](./2-frontends/1-displayapp.html).
