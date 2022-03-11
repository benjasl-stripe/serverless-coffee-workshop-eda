+++
title = "Waiting Completion"
weight = 16
+++
## Overview

The `WaitingCompletion` event is emitted by the `OrderProcessor` workflow built in module 1. At this point in the order, the user has submitted their drink request, the `OrderProcessor` workflow has generated an order number, and is now paused until the barista completes the order. The workflow has emitted a `WaitingCompletion` event, along with a new `TaskTaken` which is used to resume the workflow.

You will now create a new rule to route this event to a Lambda function that will update the `serverlesspresso-order-table` with the new `TaskToken`, order number, and order state.

![Execution results](../images/se-mod2-WaitingCompletion1.png)

## Creating the "Waiting Completion" rule
### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge in *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**. Select the event bus named **Serverlesspresso**. Choose **Create rule**.

![Create rule](../images/se-mod2-logAll10.png)

3. For the *Name*, enter `WaitingCompletion`.

4. Choose **Custom pattern**.

5. Copy-and-paste the following into the Event Pattern section:
```
{
  "detail-type": ["OrderProcessor.WaitingCompletion"],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

6. Choose **Save**.

7. In the *Select targets* section, choose *Lambda*

8. In the Lambda section, choose the Serverlesspresso function containing the name `WaitingCompletion`. Tip: You can start typing "WaitingCompletion" into the field to find the function.

9. Choose **Create**.
