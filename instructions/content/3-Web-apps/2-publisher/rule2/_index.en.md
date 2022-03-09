+++
title = "Events for the Admin Apps"
weight = 12
+++

## Overview

The second rule will publish events for the Barista and Display apps, which are both considered admin apps. The rule filters for specific events and routes to a Lambda function that publishes to AWS IoT Core, to route to the front end application.

## Creating the "Publisher - Admin" rule

### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge in *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**. Select the event bus named **Serverlesspresso**. Choose **Create rule**.

![Create rule](../../images/se-mod2-logAll10.png)

3. For the Name, enter *Publisher-Admin*. Ensure the event bus selected is **Serverlesspresso**.

4. Choose **Custom pattern**. Copy-and-paste the following into the *Event Pattern* section:
```
{
  "detail-type": [{
    "prefix": "OrderManager."
  }, {
    "prefix": "OrderProcessor."
  }, {
    "prefix": "Validator."
  }, {
    "prefix": "ConfigService."
  }],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

5. Choose **Save**.

6. In the *Select targets* section, choose *Lambda function*.

7. In the *Function* dropdown, choose the function name containing *PublisherFunctionAdmin*. Tip: You can start typing `PublisherFunctionAdmin` into the search box to find the function.

8. Choose **Create**.
