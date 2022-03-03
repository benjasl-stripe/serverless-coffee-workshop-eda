+++
title = "Deploying the backend"
weight = 13
+++

The Serverlesspresso application consists of frontends and a backend. The backend is a set of serverless microservices.

Some parts of the backend application have been developed already. In this section, you will clone a repo containing these pre-built parts and deploy it into your environment. You will deploy:

* A Cognito configuration so users can log in from the frontends and be autheticated by the backend.
* An Order Management services, which will keep track of the coffee orders.
* TBD

After you have deployed these back-end resources, you will then build the Step Functions workflow and set up the events that make the application work.

Each of the following sections provides an implementation overview and detailed, step-by-step instructions.

## Cloning the GitHub repository ##

### Step-by-step instructions ###

Clone the repo which will download a local copy of the instructions and code you will use to build the backend portion of the workshop.

1. Run these commands in the Cloud9 terminal window:

```console
cd ~/environment/
git clone https://github.com/aws-samples/aws-serverless-workshop-serverlesspresso ./serverlesspresso-backend
```

![Module 0 Cloud9 clone](../images/setup6.png)

2. Within the Cloud9 file browser on the left hand side you can see the backend files have been downloaded.

![Module 0 Cloud9 backend files](../images/setup7.png)

## Deploy the backend infrastructure

This is a good time to introduce the [AWS Serverless Application Model](https://aws.amazon.com/serverless/sam/), or AWS SAM. SAM is an open-source framework that makes it easier to deploy serverless infrastructure.

This allows you to specify your application requirements in code and SAM transforms and expands the SAM syntax into AWS CloudFormation to deploy your application. You will see and use SAM templates throughout this workshop.

*More information on this services used in this section:*
* [AWS Serverless Application Model](https://aws.amazon.com/serverless/sam/)

### Step-by-step instructions

In this section, you will complete your first SAM deployment which will build much of the backend infrastructure which we will add to through the rest of the workshop.

1. Go back to your browser tab with Cloud9 running. If you need to re-launch Cloud9, from the AWS Management Console, select **Services** then select [**Cloud9**](https://console.aws.amazon.com/cloud9) under *Developer Tools*. **Make sure your region is correct.**

2. Change directory:
```
cd ~/environment/serverlesspresso-backend/
```
3. Use SAM CLI to deploy the infrastructure by running the following command:
```
sam deploy --guided
```

At the prompt, enter `serverlesspresso-backend` for *Stack Name*. You can accept the defaults for the other parameters.

![SAM setup](../images/setup8.png)

This will take a few minutes to deploy. You can see the deployment progress in the console. Wait until you see the `Successfully created/updated stack - serverlesspresso-backend` confirmation message in the console before continuing.

While you wait, here's what the custom parameters do:

- **AppName**: Used by all the resources to prefix variables and provide common naming, to make it easier to identify everything used by the application.
- **Service**: The name of this service stack.
- **LogRetentionInDays**: Defines how many days CloudWatch should keep log files. By default, this has no limit.
- **Source**: The source name used by events in this application. This helps us filter only for events produced by microservices in this workload.

The *TimeInterval*, *CodeLength*, and *TokensPerBucket* values defines how the barcode functionality works in the Display App in the frontend. With the default values here, the barcode represents a 10-character unique code that provides 10 drinks every 5 minutes. We'll cover this in more detail in the frontends section.

4. Once the deployment is complete, you'll see a list outputs in the terminal under `CloudFormation outputs from deployed stack`.

![SAM setup](../images/setup9.png)

Copy these outputs from the stack to a scratch file, notepad or text editor for later use. These are all the resource names you'll need in subsequent modules.

5. SAM has now used CloudFormation to deploy a stack of backend resources which will be used for the rest of the workshop.

### Recap

* You cloned a GitHub Repo containing an infrastructure template with resources used by the application.
* You deployed the core SAM template to your AWS account.

### Next steps

In the next module, you'll learn about workflows and state machines, and build the main workflow that powers the application.
