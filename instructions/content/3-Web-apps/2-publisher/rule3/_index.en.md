+++
title = "Events for Configuration Changes"
weight = 13
+++

## Overview

The third rule will publish events for all apps related to application-wide configuration changes, such as when the store opens or closes. The rule filters for specific events and routes to a Lambda function that publishes to AWS IoT Core, to route to the front end application.

## Creating the "Publisher - Config" rule

### Step-by-step instructions ##

1. Go to the EventBridge console. From the AWS Management Console, select *Services* then select EventBridge in *Application Integration*. **Make sure your region is correct**.

2. Choose **Rules**. Select the event bus named **Serverlesspresso**. Choose **Create rule**.

![Create rule](../../images/se-mod2-logAll10.png)

3. For the Name, enter *Publisher-Config*. Ensure the event bus selected is **Serverlesspresso**.

4. Choose **Custom pattern**. Copy-and-paste the following into the *Event Pattern* section:
```
{
  "detail-type": [{
    "prefix": "ConfigService."
  }],
  "source": ["awsserverlessda.serverlesspresso"]
}
```

5. Choose **Save**.

6. In the *Select targets* section, choose *Lambda function*.

7. In the *Function* dropdown, choose the function name containing *PublisherFunctionConfig*. Tip: You can start typing `PublisherFunctionConfig` into the search box to find the function.

8. Choose **Create**.

## Review all the rules created in EventBridge

At the end of this section, you have created a total of 7 rules in EventBridge. If you have fewer, double-check that you have created all the rules on the `Serverlesspresso` event bus and not the default bus.

![Create rule](../images/se-mod3-publisher1.png)