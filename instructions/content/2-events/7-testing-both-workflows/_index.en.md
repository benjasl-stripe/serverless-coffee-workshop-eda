+++
title = "End-to-end test"
weight = 17
+++
## Overview

In this section, you will test both workflows. The OrderProcessor workflow manages the overall path of an individual drink order. The OrderManager workflow handles drink updates and status changes. By interacting with both, you can complete a order from start to finish.

There are 3 steps:
- Creating a new drink order.
- Adding the drink detail to the order.
- Completing the order

### Setting up your browser tabs

This section moves between different workflows and services. The prepare, open two tabs in your browser:

- In the first tab, go to the Step Functions console and open the *OrderProcessorWorkflow*. This is the workflow you built in module 1.
- In the second tab, go to the Step Functions console and open the *OrderManagerStateMachine*. This workflow was deployed in the setup module.
- Ensure you have the [AWS Cloud 9](https://console.aws.amazon.com/cloud9) open in another tab.

The instructions below will use all of these tabs, so leave these open for the duration of this section.

## 1. Creating a new drink order

First, create a new workflow execution to simulate an incoming order caused by a customer scanning a QR code.

### Step-by-step instructions ###

To start a new workflow execution:

1. From the AWS Cloud9 tab, run the following AWS CLI command. This emits the `NewOrder` event to the `serverlesspresso` event bus that starts the `OrderProcessor` workflow:
```
aws events put-events --entries '[{"Source":"awsserverlessda.serverlesspresso", "DetailType":"Validator.NewOrder", "EventBusName":"Serverlesspresso", "Detail": "{\"userId\":\"1\",\"orderId\":\"2\"}"}]'

```
2. Go to the *OrderProcessorWorkflow* tab. In the *Executions* panel, open the most recent execution in a *Running* state.

![Execution results](../images/se-mod3-events5-2.png)

3. The Workflow is paused at the *WorkflowStarted* state. The first `TaskToken` has been saved to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table) in `DynamoDB`.

4. Go to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table).

5. Find the entry where **SK** is "2". Choose **Orders** from the *PK* column to open the item detail.
![Execution results](../images/se-mod2-WaitingCompletion2.png)

6. The `TaskToken` is stored here together with the unique order ID. The application uses this to resume the workflow later.

## 2. Adding the drink detail to the order

In the previous section, you discovered how the *OrderManager* workflow is used to sanitize, update, cancel orders, and resume the *OrderProcessor* workflow by returning the correct `TaskToken`.

Here, you will add detail to the drink order, simulating a customer configuring their order in the Customer App. You do this by running an OrderManager workflow to update the OrderProcessor state machine.

### Step-by-step instructions ###

1. Go to the *OrderManager* workflow tab.

2. Choose *Start execution*. Enter the following into the **input** text area and choose *Start execution*:

```
{"action":"","body":{"userId":"1","drink":"Cappuccino","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```

3. In the OrderManager workflow for this execution, this execution is now completed.

4. In the OrderProcessor tab, the workflow has resumed, allowing it to progress to the next `TaskToken` step.

![Execution results](../images/se-mod2-WaitingCompletion4.png)

5. The *WaitingCompletion* event is emitted to the Serverlesspresso event bus. The event is routed to the *WaitingCompletion* Lambda function, which updates the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table) with the newly generated *orderNumber* and `TaskToken`.

6. To veryify this, go to the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table). You can see a new column *orderNumber*, containing the human-readable order number.

7. In the OrderProcessor tab, the workflow has paused at this step until the barista notifies the application that the order has been completed.

## 3. Completing the order

Finally, use the OrderManager workflow to simulate the barista completing the order.

### Step-by-step instructions ###

1. Go to the *OrderManager* workflow tab.

2. Choose *Start execution*. Enter the following into the **input** text area and choose *Start execution*. Notice that the input payload contains the `action:complete`.
```
{"action":"complete","body":{"userId":"1","drink":"Cappuccino","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```

3. The OrderManager workflow updates DynamoDB table and resumes the OrderProcessor workflow:

![Execution results](../images/se-mod2-WaitingCompletion5.png)

In the OrderProcessor tab, the execution also completes:
![Execution results](../images/se-mod2-WaitingCompletion6.png)

4. In the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table), the drink order is updated, with status **Completed**:
![Execution results](../images/se-mod2-WaitingCompletion7.png)

### Recap

- You started the OrderProcessor workflow from the CLI to simulate a new order arriving.
- You used OrderManager workflows to simulate the customer order entry and the barista completing the order.
- You saw the effect of the persisted state in the DynamoDB table.

### Next steps

You have completed the end-to-end backend test for the workflows. In the next module, you will configure a new rule to route event back to the frontend applications. You will be able to run a complete test from the frontend applications.
