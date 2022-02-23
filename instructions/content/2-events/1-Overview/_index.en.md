+++
title = "Overview"
weight = 11
+++

The workflow created in module 1, orchestrates individual orders from start to completion. Some of the workflow steps require a human interraction (customer submitting their drink order, the barista accepting and completing the order).  

The workflow emits an event at these steps and then waits for a response before continuing. The event is emitted to a serverless event bus where it is routed to the relevant service(s). 

In the folowing steps you create *rules* in [Amazon EventBridge](https://aws.amazon.com/eventbridge/), to capture, and route these events to the relevant service.

{{% notice info %}}
This module is also available to [watch on YouTube](https://www.youtube.com/watch?v=EhgOoFbCID0).
{{% /notice %}}
