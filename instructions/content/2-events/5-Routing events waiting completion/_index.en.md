+++
title = "Waiting completion"
weight = 15
+++
## Overview

The `WaitingCompletion` event is emitted by the `OrderProcessor` workflow built in module 1. At this point in the order, the user has submitted thier drink request, the `OrderProcessor` workflow has generated an order number, and is now paused until the barista completes the order. The workflow has emitted a `WaitingCompletion` event, along with a new `TaskTken` which is used to resume the workflow. 

You will now create a new a rule to route this event to a Lambda function that will update the `serverlesspresso-order-table` with the new `TaskToken`, order number, and order state.

![Execution results](../images/se-mod2-WaitingCompletion1.png)

* You will create a new rule in [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
* You will test the new rule and see the workflow and see the input payloads.
* You will congifure the new rule to invoke an [AWS Lambda function](https://aws.amazon.com/lambda/).


## Creating the "Waiting Completion" rule.
### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge  *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**.

3. Choose the event bus named **servelresspresso**.

4. Choose **Create rule**.

5. For the Name, enter *WaitingCompletion*.

6. Choose **Custom pattern**.

7. Copy-and-paste the following into the Event Pattern section:
```
{
  "detail-type": ["OrderProcessor.WaitingCompletion"],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

8. Choose **save**.

9. In the *Select targets* section, choose *Lambda* 

10. In the Lambda section, choose the *WaitingCompletion* function*. You can start typing "WaitingCompletion" into field to find the workflow.

10. Choose **Create**.

---------------------------

## Testing the *"WaitingCompletion"* EventBridge rule.

In this section, you will test that the rule invoked the *WaitingCompletion* Lambda function, and inspect the event payload and results.

### Step-by-step instructions ###

To start a new workflow:

1. From the [AWS Cloud 9](https://console.aws.amazon.com/cloud9) terminal run the following AWS CLI command which will emit the `NewOrder` event to the `serverlesspresso` event bus that starts the `OrderProcessor` workflow:
```
aws events put-events --entries '[{"Source":"awsserverlessda.serverlesspresso", "DetailType":"Validator.NewOrder", "EventBusName":"Serverlesspresso", "Detail": "{\"userId\":\"1\",\"orderId\":\"2\"}"}]'

``` 

The Workflow should be paused at the *WorkflowStarted* state, The first TaskToken should already have been persisted to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table)  in `DynamoDB`.

1. Go to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table).

1. Find the entery where **SK** is "2", choose **Orders** from the *PK* column. 
![Execution results](../images/se-mod2-WaitingCompletion2.png)

1. Highlight and Copy the TaskToken. you will use this to resume the workflow.

![Execution results](../images/se-mod2-WaitingCompletion3.png)

1. Use the SendTaskSuccess API callback to the workflow with the task token and continue execution.  From the [AWS Cloud 9](https://console.aws.amazon.com/cloud9) terminal run the following command, replacing `YOUR_TASK_TOKEN` with the token value:

```
aws stepfunctions send-task-success  --task-output '{"orderId":1}' --task-token AAAAKgAAAAIAAAAAAAAAAmNBGPq0l0jRf5QEkzp/ZM0D4RgvZ8lDqeEywuG326ZnKc2/lURZkalVRN1QB2Ge2MvVTYsWXd/l/YRR0DjivAtWb8nHpa2SyU9zlWm6mXtiflapWitKLH995X2jrcC8MijqdRCXZg37UP1q1SRqkAwyvZSzJ0LMOV/2s5Fzgkm4AO439D5sZbQU3FYyj1429fG0wkscsZ9cUK8BUztOjobJJkQ0ixdBLQ7ZAHexNxPUkqITl5d7geQWVogXnJEyPddLHSrTnNrxQtcnga1eQ2lavZyZGEq/+MhQdMYYFcFN91Vr0SHxf39AFV3o4VJhKPqwuRviBycFBlLPtv1UwA+zbySdV0tvgJsvqjxbNsqzUJpi1gKKIaO4GzkkETpsztJmdOqx2OiDwWtNUVElt2MIoHr6nCzzQ2cWADgH+quH8z34m9wKjds9glxFHJE47d3eN06+U0Tn66rx9hi49nillTE+jXVbgUccatiI7wVfdT3GwMHis5lgGYqRqUMIzeMPAAG0+EmTXyI/qFgCzt7h/vGgUMNPSQXQtjBYfeYh6vwLN+X9DOuD+L7P/l5bQ20A9yJ3JKe1T6c2039y5igQNvxZzqzCRWmrOcwSvmFB
```

This resumes the workflow, allowing it to progress to the next `TaskToken` step

![Execution results](../images/se-mod2-WaitingCompletion4.png)

Now the *WaitingCompletion* event is emitted to the Serverless event bus.

----------------------------------