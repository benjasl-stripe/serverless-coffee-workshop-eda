/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })
const documentClient = new AWS.DynamoDB.DocumentClient()

// Triggered by event: DetailType: "Validator.NewOrder"

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))

  const result = await documentClient.put({
    TableName: process.env.TableName,
    Item: {
      PK: 'orders',
      SK: event.detail.orderId,
      USERID: event.detail.userId,
      ORDERSTATE: 'CREATED',
      bucketState: event.detail.bucket,
      robot: (event.detail.robot || false),
      TS: Date.now()
    }
  }).promise()

  console.log({ result })
}
