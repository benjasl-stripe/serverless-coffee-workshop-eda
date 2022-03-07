+++
title = "The Customer App"
weight = 13
+++

The final Lambda function in the photo processing pipeline is triggered when the final image is rendered and saved into the S3 **finalbucket**. It will save the photo object information into the DynamoDB table and send a message to the IoT topic so the frontend application is notified.


## Inside this section

TBD


## Next steps

TBD