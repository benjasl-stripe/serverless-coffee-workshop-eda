+++
title = "Events for the Customer App"
weight = 11
+++

## Overview

The first rule will publish events for the Customer App. The rule filters for specific events and routes to a Lambda function that publishes to AWS IoT Core, to route to the front end application.

## Creating the "Publisher - User" rule

### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge in *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**. Select the event bus named **Serverlesspresso**. Choose **Create rule**.

![Create rule](../../images/se-mod2-logAll10.png)

3. For the Name, enter *Publisher-User*. Ensure the event bus selected is **Serverlesspresso**.

4. Choose **Custom pattern**. Copy-and-paste the following into the *Event Pattern* section:
```
{
  "detail-type": [{
    "prefix": "OrderManager."
  }],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

5. Choose **Save**.

6. In the *Select targets* section, choose *Lambda function*.

7. In the *Function* dropdown, choose the function name containing *PublisherFunctionUser*. Tip: You can start typing `PublisherFunctionUser` into the search box to find the function.

8. Choose **Create**.
