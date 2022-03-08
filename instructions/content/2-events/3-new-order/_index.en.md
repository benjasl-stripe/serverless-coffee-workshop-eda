+++
title = "New Order"
weight = 13
+++
## Overview

Until now, you have manually started the `OrderProcessor` workflow from the [Step Functions console](https://console.aws.amazon.com/states/home).

In production, the workflow is started by an event generated from the *Validator service*. The event is emitted each time a QR code is scannned by a customer.

* You will create a new rule in [Amazon EventBridge](https://aws.amazon.com/eventbridge/) that passes the Validator event to your OrderProcessor workflow.
* You will test the new rule by mocking the event sent from the Validator service.

![Execution results](../images/se-mod2-NewOrder4.png)

## Creating the "New Order" rule

In this section, you will build the rule that listens to the `Validator.NewOrder` event and passes this to the order workflow target.

### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge in *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**. Select the event bus named **Serverlesspresso**. Choose **Create rule**.

![Create rule](../images/se-mod2-logAll10.png)

3. For the Name, enter *NewOrder*.

4. Choose **Custom pattern**. Copy-and-paste the following into the *Event Pattern* section:
```
{
  "detail-type": ["Validator.NewOrder"],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

5. Choose **save**.

6. In the *Select targets* section, choose *Step Functions state machine*.

7. In the State machine section, choose *OrderProcessorWorkflow*. Tip: You can start typing `OrderProcessor` into the search box to find the workflow.

8. Choose **Create**.

![NewOrder rule created](../images/se-mod2-logAll11.png)

## Testing the *"New Order"* rule

In this section, you will test the rule that starts the **OrderProcessor** workflow when the *NewOrder* event is emitted.

### Step-by-step instructions ###

1. Go to the tab with AWS Cloud9 terminal. If you have closed this tab, go to the AWS Management Console, Select **Services** then select [**AWS Cloud9**](https://console.aws.amazon.com/cloud9/home) under Developer Tools. In the *Serverlesspresso* environment, choose **Open IDE**. Within a couple of minutes, the environment will be ready.

2. In the terminal, to emit the `NewOrder` event to the `serverlesspresso` event bus, run:
```
aws events put-events --entries '[{"Source":"awsserverlessda.serverlesspresso", "DetailType":"Validator.NewOrder", "EventBusName":"Serverlesspresso", "Detail": "{\"userId\":\"1\",\"orderId\":\"1\"}"}]'

```
This should return an event ID:

![Execution results](../images/se-mod2-NewOrder1.png)

This starts a new execution in the `OrderProcessor` workflow.

3. From the [AWS Step Functions console](https://console.aws.amazon.com/states/home?#/statemachines) select the *OrderProcessorWorkflow* you created earlier. You will see the most recent execution with the *Status*, *Running*.

![Execution results](../images/se-mod2-NewOrder2.png)

4. Choose the latest execution from the *Name* column. The console shows the *Execution status* of *Running*. The left side shows the flow of execution with the green states showing the actual path. The blue state shows when executed is suspended, pending a callback.

![Execution results](../images/se-mod1-wait11.png)

The new rule has sucessfully routed the `NewOrder` event to the `OrderProcessor` workflow. In the next step, you create a rule that routes the `WorkflowStarted` event to an [AWS Lambda](https://aws.amazon.com/lambda/) function.

### Recap

- Before this section, the Validator service published events to the custom bus when the QR code is scanned but nothing was subscribed to these events. You created a rule that subscribes to Validator events and routes the traffic to the order workflow.
- To test, instead of scanning a QR code to trigger the Validator service, you mocked an example event and published it to the custom event bus using the CLI.
- You verified that the Validator event triggered the rule and started the workflow.

### Next steps

Next, you'll create an event that the Order Manager microservice uses to persist details of orders.