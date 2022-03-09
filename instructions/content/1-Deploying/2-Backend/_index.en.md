+++
title = "Backend"
weight = 12
+++

## Module 1 backend-architecture

[![See Serverlesspresso](/images/se-setup-overview4.png)](https://youtu.be/M6lPZCRCsyA)
The backend is a set of serverless microservices. In this section we will deploy the following:

* The *Counting* microservice:  An [Amazon DynamoDB](https://aws.amazon.com/dynamodb) table for persisting Order numbers.
* The *OrderManager* microservice - Provides an API to send/update/cancel a coffee order. Consists of a DynamoDB table containing the state of each customer order.
* The *Config* microservice - A DynamoDB table containg information about menu items and shop status, along with An [Amazon API Gateway](https://aws.amazon.com/apigateway) Resource to provide authenticated access.
* The *Publishing* microservice - Routes events to different IoT core topics. IoT Core publishes event messages to front end applications.
* The *Validator* microservice - Provides QR codes to front end display applicaiton, Codes are sotred in a DynamoDB table and used to validate each order.

## Deploy the backend infrastructure

This is a good time to introduce SAM the Squirrel. SAM stands for Serverless Application Model which is an open-source framework that makes it easier to deploy serverless infrastructure.

This allows you to specify your application requirements in code and SAM transforms and expands the SAM syntax into AWS CloudFormation to deploy your application. You will see and use SAM templates throughout this workshop.

More information on this services used in this section:

* [AWS Serverless Application Model](https://aws.amazon.com/serverless/sam/)

In this section, you will complete your first SAM deployment which will build much of the backend infrastructure which we will add to through the rest of the workshop.
Step-by-step instructions

Go back to your browser tab with Cloud9 running. If you need to re-launch Cloud9, from the AWS Management Console, select Services then select Cloud9 under Developer Tools. Make sure your region is correct.

1. Change directory:

```
cd ~/environment/serverlesspresso-backend/setup
```

1. Use SAM CLI to deploy the first part of the infrastructure by running the following commands:

```
sam build
```
```
sam deploy --guided
```
When prompted enter the following values:
```

        Setting default arguments for 'sam deploy'
        =========================================
        Stack Name [severlesspresso-workshop-core]: 
        AWS Region [us-east-2]: 
        Parameter AppName [ServerlesspressoWorkshop-4]: 
        Parameter Service [core]: 
        Parameter LogRetentionInDays [14]: 
        Parameter TimeInterval [5]: 
        Parameter CodeLength [10]: 
        Parameter TokensPerBucket [10]: 
        Parameter Source [awsserverlessda.serverlesspresso]: 
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [Y/n]: n
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: y
        Save arguments to configuration file [Y/n]: y
        SAM configuration file [samconfig.toml]:  
        SAM configuration environment [default]: 
```

This will take a few minutes to deploy. You can see the deployment progress in the console. Wait until you see the **Successfully created/updated stack - serverelsspresso** confirmation message in the console before continuing.

```
CloudFormation outputs from deployed stack

------------------------------------------------------------------------------------------------------------------------------------
Outputs                                                                                                                            
------------------------------------------------------------------------------------------------------------------------------------
Key                 RESTApiForOrderManager                                                                                         
Description         API Prod stage endpoint                                                                                        
Value               https://wgp3eel343.execute-api.us-east-2.amazonaws.com/Prod/                                                   

Key                 UserPoolID                                                                                                     
Description         UserPool ID                                                                                                    
Value               us-east-2_8ME6cnarR                                                                                                                            

Key                 IotEndpointAddress                                                                                             
Description         IotEndpointAddress URL                                                                                         
Value               a1l0nlj0ow3dyu.iot.us-east-2.amazonaws.com                                                                     


Key                 UserPoolClient                                                                                                 
Description         UserPool Client                                                                                                
Value               5i6pv7fevmlb8o01uo9vid3knd                                                                                     

Key                 RESTApiForConfigService                                                                                        
Description         API Prod stage endpoint                                                                                        
Value               https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod/                                                   

Key                 RESTApiForValidatorService                                                                                     
Description         API Prod stage endpoint                                                                                        
Value               https://szxmyl1ki4.execute-api.us-east-2.amazonaws.com/Prod/                                                                                                                                                                                                               
-----------------------------------------------------------------------------------------------
```

SAM has now used CloudFormation to deploy a stack of backend resources which will be used for the rest of the workshop:

* 2 Lambda functions
* 3 S3 buckets
* A DynamoDB tables
* A Cognito UserPool
* An AWS IoT thing
* Step Functions workflows
* EventBridge custom event bus
* Several IAM roles and policies.


{{% notice tip %}}
Now you are ready to start building 👷 
{{% notice note %}}