+++
title = "Overview"
weight = 11
+++

## What are events?

In the simplest terms, an event is a signal that a system's state has changed. In AWS, it's represented as a JSON message, containing some set of facts about what changed and potentially what the current state of the system is.

Events are:
* Facts: they are based on something that happened.
* Immutable: they cannot be undone. For example, an event could be a coffee order. If you cancel the order, that is separate cancellation event, and do not change the contents of the original event.
* Observable: microservices can subscribe to events they care about.
* Temporal: the time of an event matters.

## How do you route events between systems and microservices?

The workflow created in module 1 orchestrates individual orders from start to finish. Some of the workflow steps require human interraction (such as a customer submitting their drink order, or the barista accepting and completing the order).

The workflow emits an event at these steps and then waits for a response before continuing. The event is emitted to a serverless event bus where it is routed to the relevant service(s).

The routing is performed by [Amazon EventBridge](https://aws.amazon.com/eventbridge/). You publish events to buses, and subscribers use rules to filter for events they care about. In this module, you'll create *rules* in EventBridge to capture and route these events to the relevant service.

## How it works

EventBridge lets you route events from AWS services, custom applications, software as a service application and microservices. The events are sent to buses, including custom buses you can set up specifically for your workload. Consumers such as AWS services or microservices then use rules to filter for the messages they want to receive.

![Drag Pass state to designer](../images/se-mod1-routing1.png)

This is the messaging behind event driven architecture. It allows you to decouple the producers and consumers of events - the producers do not know who, if anyone, is listening to the events they publish. Similarly, subscribers do not know if anyone else is listening and they may not the publisher of the event.

This can make faster to develop new features in software, increase extensibility, and reducing friction between development teams.

{{% notice info %}}
Watch this [introduction to EventBridge on watch on YouTube](https://www.youtube.com/watch?v=TXh5oU_yo9M).
{{% /notice %}}

*More information on this services used in this section:*
* [Amazon EventBridge](https://aws.amazon.com/eventbridge/)