


const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION || 'us-east-1' })
const documentClient = new AWS.DynamoDB()


const configTableName = process.env.configTable
const countingTableName = process.env.countingTable

//import the file system library
const fs = require('fs');
//Then load it into a varibale
var initMenuState = JSON.parse(fs.readFileSync('./initMenuState.JSON'));
var initCountingState = JSON.parse(fs.readFileSync('./initCountingState.JSON'));

// BatchWrite params template
const params = {
  RequestItems: {
    [configTableName]: [],
    [countingTableName]: []
  }
}

// Load in d template
initMenuState.map((d) => {
  console.log(d)
  params.RequestItems[configTableName].push ({
    PutRequest: {
      Item: {
        ...d
      }
    }
  })
})

initCountingState.map((d) => {
  console.log(d)
  params.RequestItems[countingTableName].push ({
    PutRequest: {
      Item: {
        ...d
      }
    }
  })
})

const initMenu = async () => {
  try {
    console.log('params',JSON.stringify(params,null,0))
    const result = await documentClient.batchWriteItem(params).promise()
    console.log('initMenus result: ', result)
  } catch (err) {
    console.error('initMenus error: ', err)
  }
}

module.exports = { initMenu }