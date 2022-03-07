+++
title = "Testing"
weight = 18
+++

## Overview

* You will test the workflow with the store open and closed to follow different execution paths through the workflow.
* You will test the store capacity feature by starting multiple executions and observing where the capacity exceeds what the shop can handle.

After this section, you will have a workflow that is ready to support the drink ordering application.

## 1. Testing the workflow with the store open

The shop's state is stored in the DynamoDB configuration table for the application. The *Is the shop open?* transition checks this value and uses a Step Functions choice state to determine the flow. Here, you will toggle this state and run executions to test the outcome.

### Step-by-step instructions ##

1. Go to the DynamoDB console. From the AWS Management Console, select *Services* then select DynamoDB under *Database*. Make sure your region is correct.

2. From the left-hand menu, choose *Explore items* in the *Tables* menu. Choose **serverlesspresso-config-table** in the *Tables* list.

![DynamoDB table view](../images/se-mod1-testing0.png)

The three items in the table provide state information for different parts of the application:
- **orderID**: Used by the workflow to increment the human-readable order ID for each drink order.
- **menu**: Used by the customer ordering frontend to display a valid list of drinks and modifiers for ordering.
- **config**: Contains general settings, including whether the store is open or closed.

3. Choose the *config* item in the *Items returned* panel. This opens the item editor.

![Config item](../images/se-mod1-testing1.png)

4. Set the store to open. Paste the following JSON, which sets `storeOpen` to `true`.

```
{
 "PK": "config",
 "storeOpen": true,
 "maxOrdersPerUser": 1,
 "maxOrdersInQueue": 10
}
```

5. Choose **Save changes** to update the table.

6. Go to the Step Functions console. From the AWS Management Console, select *Services* then select Step Functions under *Application Integration*. **Make sure your region is correct**.

7. Under *State machines*, select *OrderProcessorWorkflow*. On the page showing the workflow, choose **Start execution**.

8. In the *Start execution* pop-up, enter the following JSON payload, then choose **Start execution**:

```
{
    "detail": {
      "orderId": "1",
      "userId": "testuser"
    }
}
```

9. The *Graph inspector* shows the workflow path taken as a result of the store being open.

![Store is open](../images/se-mod1-testing2.png)

## 2. Testing the workflow with the store closed

Now you will toggle this state value in the DynamoDB table and start another execution to test the outcome.

### Step-by-step instructions ##

1. Go to the DynamoDB console. From the AWS Management Console, select *Services* then select DynamoDB under *Database*. Make sure your region is correct.

2. From the left-hand menu, choose *Explore items* in the *Tables* menu. Choose **serverlesspresso-config-table** in the *Tables* list.

![DynamoDB table view](../images/se-mod1-testing0.png)

3. Choose the *config* item in the *Items returned* panel. This opens the item editor.

![Config item](../images/se-mod1-testing1.png)

4. Set the store to open. Paste the following JSON, which sets `storeOpen` to `false`.

```
{
 "PK": "config",
 "storeOpen": false,
 "maxOrdersPerUser": 1,
 "maxOrdersInQueue": 10
}
```

5. Choose **Save changes** to update the table.

6. Go to the Step Functions console. From the AWS Management Console, select *Services* then select Step Functions under *Application Integration*. **Make sure your region is correct**.

7. Under *State machines*, select *OrderProcessorWorkflow*. On the page showing the workflow, choose **Start execution**.

8. In the *Start execution* pop-up, enter the following JSON payload, then choose **Start execution**:

```
{
    "detail": {
      "orderId": "1",
      "userId": "testuser"
    }
}
```

9. The *Graph inspector* shows the workflow path taken as a result of the store being closed.

![Store is closed workflow](../images/se-mod1-testing3.png)

10. The execution has ended. In the *Execution event history* panel, expand the event with the type *TaskScheduled* for the step *EventBridge PutEvents*.

![Execution history](../images/se-mod1-testing4.png)

The workflow has emitted an event indicating that the shop is unavailable. This can be consumed by other microservices in the application to take appropriate actions.

11. Set the store back to "open" in the DynamoDB table. 1. Go to the DynamoDB console. From the AWS Management Console, select *Services* then select DynamoDB under *Database*. Make sure your region is correct.

12. From the left-hand menu, choose *Explore items* in the *Tables* menu. Choose **serverlesspresso-config-table** in the *Tables* list.

13. Choose the *config* item in the *Items returned* panel. This opens the item editor.

14. Set the store to open. Paste the following JSON, which sets `storeOpen` to `true`.

```
{
 "PK": "config",
 "storeOpen": true,
 "maxOrdersPerUser": 1,
 "maxOrdersInQueue": 10
}
```

15. Choose **Save changes** to update the table.

## 2. Testing the workflow with excess orders



### Step-by-step instructions ##

1. Go to the Step Functions console. From the AWS Management Console, select *Services* then select Step Functions under *Application Integration*. **Make sure your region is correct**.

2. From the left-hand menu, select *State machine* and choose **OrderProcessorWorkflow** from the list. Copy the ARN value to a scratchpad - you will need this value later. Choose **Edit**.

3. Use the [StartExecution API](https://docs.aws.amazon.com/cli/latest/reference/stepfunctions/start-execution.html) to start a new workflow. In a terminal, enter the following command, replacing `YOUR_STATE_MACHINE_ARN` with the ARN copied in the previous step:

```
aws stepfunctions start-execution --state-machine-arn YOUR_STATE_MACHINE_ARN --input "{\"detail\":{\"orderId\":\"1\",\"userId\":\"testuser\"}}"
```
