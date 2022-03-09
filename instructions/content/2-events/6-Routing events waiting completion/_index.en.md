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

1. The `TaskToken` is presisted here along with the unique order ID. The appliction uses this to resume the workflow.

----------
In the previous section you discovered how the *OrderManager* workflow, is used to sanitize, update, cancel each order, and resume the *OrderProsessor* workflow by returning the correct `TaskToken`.

![Execution results](../images/se-mod2-WaitingCompletion3.png)

1. Run the *OrderManager* workflow, to update the order and move resume the orderProssing Workflow.
1. Go to the workflow in the Step Functions console, 
1. Choose *Start execution*, enter the following into the **input** text area and choose *Start execution*:

```
{"action":"","body":{"userId":"1","drink":"Cappuccino","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```

This resumes the workflow, allowing it to progress to the next `TaskToken` step

![Execution results](../images/se-mod2-WaitingCompletion4.png)

Now the *WaitingCompletion* event is emitted to the Serverless event bus. The event is routed to the  *WaitingCompletion* Lambda function, which updates the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table) with the newly generated *orderNumber* and `TaskToken`.

1. To veryify this, go to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table), you can see a new column *orderNumber*, containg the human readable order number.

The workflow will pause at this step untill the Barista notifies the system that the order has been completed.


## Completing the order

1. Run the *OrderManager* workflow, to update the order move resume the orderProssing Workflow.
1. Go to the workflow in the Step Functions console, 
1. Choose *Start execution*, enter the following into the **input** text area and choose *Start execution*:
  Notice that the input payload contains the `action:complete`.

```
{"action":"complete","body":{"userId":"1","drink":"Cappuccino","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```
OrderManager workflow updates DynamoDB and resumes OrderProcessor workflow
![Execution results](../images/se-mod2-WaitingCompletion5.png)
OrderProcessor workflow completes
![Execution results](../images/se-mod2-WaitingCompletion6.png)
[serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table) is updated, with status **Completed**
![Execution results](../images/se-mod2-WaitingCompletion7.png)
----------------------------------