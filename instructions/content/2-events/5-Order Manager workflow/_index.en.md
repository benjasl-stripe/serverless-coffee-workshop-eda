+++
title = "Order manager workflow"
weight = 15
+++


The *OrderManager* workflow is deployed with the innitial core setup. It is triggered by an API call from the front-end applicaitons. It persist updates to the order entry in the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table). It also retrieves the current `TaskToken` and resumes the `orderProcessor` workflow.

![The Order manager workflow](../images/se-mod2-OrderManagerwf3.png)


The *OrderManager* workflow is is responsible for 4 differnt workloads:
1. **Customer put**: This is when a customer has submitted a drink order, the workflow will sanitise this order against the current menu to make sure it is a valid selection, and then update the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table) with the order information.
2. **Cancel Order**: This path is taken when either the barista or the customer decide to cancel their order.
3. **Complete Order**: This path is taken when the barista chooses the **complete** button on the barista app.  
4. **Make / Unmake**: This path is taken then the barista claims an order from the barista app, or when the barista moves the order back into the *order pending* state. 

The workflow path is initially decided by a *Choice* state which queries the `$.action` field, and branches accordingly. This is illustrated in the diagram below:
![The Order manager workflow](../images/se-mod2-OrderManagerwf1.png)


## Testing the *"OrderManager"* workflow.

Resume the *OrderProcessor* workflow by running the *OrderManager* workflow:

1. Go to the workflow in the Step Functions console, 
1. Choose *Start execution*, enter the following into the **input** text area and choose *Start execution*:

```
{"action":"","body":{"userId":"1","drink":"Cappuccino","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```
![The Order manager workflow](../images/se-mod2-OrderManagerwf4.png)


See how has affected the *OrderProcessor* workflow:

1. Choose *State machines*, from the breadcumbs at the top of the page.
1. Choose the *OrderProcessor* workflow, and then chose the most recent exectution:

![The Order manager workflow](../images/se-mod2-OrderManagerwf7.png)


The `TaskToken` has been used to send a 'TaskSuccess' call to the *OrderProcessor*. The workflow has resumed and progressed to the next wait step.
This was done by the *Resume Order Processor* step.
####

******SHOULD we have the user build this step them selves?

###
--------------

See what happens if an item is ordered that is not on the menu:

1. Go to the *OrderManager* workflow in the Step Functions console, 
1. Choose *Start execution*, enter the following into the **input** text area and choose *Start execution*:

```
{"action":"","body":{"userId":"1","drink":"milkshake","modifiers":[],"icon":"barista-icons_cappuccino-alternative"},"orderId":"2","baristaUserId":"3"}
```
This input payload includes a drink that is not available on the menu `"drink":"milkshake"`. 
![The Order manager workflow](../images/se-mod2-OrderManagerwf6.png)
The workflow takes a different execution path from the *Is Order Valid?* state, and so the order is not entered into the [serverlesspresso-order-table](https://console.aws.amazon.com/dynamodbv2/home?#item-explorer?initialTagKey=&maximize=true&table=serverlesspresso-order-table).


