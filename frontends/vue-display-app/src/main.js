/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

import { createApp } from 'vue'
import App from './App.vue'

// Theming framework
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

// Global event bus
import mitt from 'mitt'
const emitter = mitt()

// Amplify imports
import Amplify from 'aws-amplify'

const app = createApp(App).use(  VuesticPlugin,{
  components: {
    VaChip: {
      outline: true,
      rounded: false,
      size: 'large',
      color: '#000'
    },
    VaCard:{
      stripe: false,
      stripeColor:"black",
      square: false
    },
    VaButton:{
      color:"#08c18a"
    },

    VaButtoGroup:{
      color:"#08c18a"
    }
  },
})
app.config.globalProperties.emitter = emitter

/* ===================================================
                      CONFIGURATION
    You must add your own values here! See the tutorial
    in the GitHub repo for more information. @jbesw
   =================================================== */

app.config.globalProperties.$appLogo = 'https://assets.serverlesscoffee.com/images/serverlesspresso-large.png'

// ** Backend config **
app.config.globalProperties.$appName = 'Validator'
app.config.globalProperties.$adminApp = true

// Get global vars from local cache
if (localStorage.UIstate) {
  const UIstate = JSON.parse(localStorage.UIstate)
  console.log('Mounted - Local storage: ', UIstate)

  // Hydrating state from local cache
  app.config.globalProperties.$region = UIstate.region || ''
  app.config.globalProperties.$userPoolId = UIstate.userPoolId || ''
  app.config.globalProperties.$userPoolWebClientId = UIstate.userPoolWebClientId || ''

    //  PoolId: Retrieve this with the CLI command: aws cognito-identity list-identity-pools --max-results 10 --region <<REGION>>
  app.config.globalProperties.$poolId = UIstate.poolId || '' // 'YourCognitoIdentityPoolId'
  //  IoTendpoint: Retrieve this with the CLI command: aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-west-2
  app.config.globalProperties.$host = UIstate.host || '' // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'

  app.config.globalProperties.$orderManagerEndpoint = UIstate.orderManagerEndpoint || ''
  app.config.globalProperties.$APIGWEndpointValidatorService = UIstate.APIGWEndpointValidatorService || ''
  app.config.globalProperties.$APIGWEndpointConfigService = UIstate.APIGWEndpointConfigService || ''
  app.config.globalProperties.$ConfigEndpoint = `${app.config.globalProperties.$APIGWEndpointConfigService}/config`
}

// Are global vars initialized?
app.config.globalProperties.$init = false
console.log('Starting with: ', app.config.globalProperties)

// Only init if settings are provided
if (app.config.globalProperties.$APIurl === '' ||
  app.config.globalProperties.$userPoolId === '' ||
  app.config.globalProperties.$userPoolWebClientId === '' ||
  app.config.globalProperties.$poolId === '' ||
  app.config.globalProperties.$host === '' ||
  app.config.globalProperties.$orderManagerEndpoint === '' ||
  app.config.globalProperties.$APIGWEndpointValidatorService === '' ||
  app.config.globalProperties.$APIGWEndpointConfigService === '') {
    console.log('Open settings')
} else {
  try {
    Amplify.configure({
      "aws_cognito_username_attributes": [
          "EMAIL"
      ],
      "aws_cognito_signup_attributes": [
          "EMAIL"
      ],
      "aws_cognito_mfa_configuration": "OFF",
      Auth: {
        region: app.config.globalProperties.$region,
        identityPoolRegion: app.config.globalProperties.$region,
        userPoolId: app.config.globalProperties.$userPoolId,
        userPoolWebClientId: app.config.globalProperties.$userPoolWebClientId,
        mandatorySignIn: false,
        authenticationFlowType: 'USER_SRP_AUTH',
      }
    })
  } catch (err) {
    console.error('Error: ', err)
  }
  app.config.globalProperties.$init = true
}

console.log('Init state: ', app.config.globalProperties.$init)

app.mount('#app')