+++
title = "New Order"
weight = 13
+++
## Overview


Until to now you have manually started the `OrderProcessor` workflow from the [AWS Step Functions](https://aws.amazon.com/step-functions/) Console. 
In produciton, the workflow is started by an event generated from the  *Validator service*. The event is emitted each time a QR code is scannned by a customer.

* You will create a new rule in [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
* You will test and inspect the new rule and to that it starts the `OrderProcessor` workflow.
* You will congifure the new rule to route the event start the [AWS Step Functions](https://aws.amazon.com/step-functions/) *OrderProcessor* Workflow.

![Execution results](../images/se-mod2-NewOrder4.png)

## Creating the "New Order" rule.
### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge  *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**.

3. Choose the event bus named **servelresspresso**.

4. Choose **Create rule**.

5. For the Name, enter *NewOrder*.

6. Choose **Custom pattern**.

7. Copy-and-paste the following into the Event Pattern section:
```
{
  "detail-type": ["Validator.NewOrder"],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

8. Choose **save**.

9. In the *Select targets* section, choose *Step Functions state machine* 

10. In the State machine section, choose the *OrderProcessor* workflow. You can start typing "OrderProcessor" into field to find workflow.

11. Choose **Create**.


## Testing the *"New Order"* EventBridge rule.

In this section, you will test the rule starts the **OrderProcessor** workflow when the *NewOrder* event is emitted.

### Step-by-step instructions ###

1. Go to the AWS Cloud 9 terminal.

1. In the terminal, execute the following AWS CLI command which will emit the `NewOrder` event to the `serverlesspresso` event bus:
```
aws events put-events --entries '[{"Source":"awsserverlessda.serverlesspresso", "DetailType":"Validator.NewOrder", "EventBusName":"Serverlesspresso", "Detail": "{\"userId\":\"1\",\"orderId\":\"1\"}"}]'

``` 
This should return an event ID:

![Execution results](../images/se-mod2-NewOrder1.png)

The `OrderProcessor` workflow should already be running. 

3. From the [AWS Step Functions console](https://us-east-2.console.aws.amazon.com/states/home?#/statemachines) select the *OrderProcessorWorkflow* you created earlier. You will see the most recent execution with the *Status*, *Running*.

![Execution results](../images/se-mod2-NewOrder2.png)

4. Choose the latest execution from the *Name* column. The console shows the *Execution status* of *Running*. The left side shows the flow of execution with the green states showing the actual path. The blue state shows when executed is suspended, pending a callback.

![Execution results](../images/se-mod1-wait11.png)

The new rule has sucesfully routed the `NewOrder` event to the `OrderProcessor` workflow.  In the next step you create a rule that routes the `WorkflowStarted` Event to an [AWS Lambda](https://aws.amazon.com/lambda/) Function. 


----------------------------------
