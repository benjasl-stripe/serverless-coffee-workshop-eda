/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

import { createApp } from 'vue'
import App from './App.vue'

// Vuestic theming
import { VuesticPlugin } from 'vuestic-ui'
import 'vuestic-ui/dist/vuestic-ui.css'

// Global event bus
import mitt from 'mitt'
const emitter = mitt()

// Amplify imports
import Amplify from 'aws-amplify'

// Phone number handling
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
/* ===================================================
                      CONFIGURATION
    You must add your own values here! See the GitHub
    repo for more information. @jbesw
   =================================================== */

Amplify.configure({
  Auth: {
    region: 'us-east-2',
    identityPoolRegion: 'us-east-2',
    userPoolId: 'us-east-2_8ME6cnarR',
    userPoolWebClientId: '5i6pv7fevmlb8o01uo9vid3knd',
    mandatorySignIn: false,
    authenticationFlowType: 'CUSTOM_AUTH',
  }
})

const app = createApp(App).use(VuesticPlugin)
app.config.globalProperties.emitter = emitter
app.use(VueTelInput)

app.config.globalProperties.$appName = 'Barista'
app.config.globalProperties.$adminApp = true

// ** Backend config **
app.config.globalProperties.$region = 'us-east-1'
app.config.globalProperties.$APIurl = 'https://wgp3eel343.execute-api.us-east-2.amazonaws.com/Prod'//ordermanager service API
app.config.globalProperties.$APIconfigURL = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod'
app.config.globalProperties.$ConfigEndpoint = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod/config'


// ** Websocket connection **
//  PoolId: Retrieve this with the CLI command: aws cognito-identity list-identity-pools --max-results 10 --region <<REGION>>
app.config.globalProperties.$poolId = 'us-east-1:a6da19f2-1bc3-4bc4-a776-c2d2cd4d5c4d' // 'YourCognitoIdentityPoolId'
//  IoTendpoint: Retrieve this with the CLI command: aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-west-2
app.config.globalProperties.$host = 'a2ty1m17b5znw2-ats.iot.us-east-1.amazonaws.com' // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'

app.mount('#app')