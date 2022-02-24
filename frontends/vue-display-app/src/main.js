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

// Phone number handling
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

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
}).use(VueTelInput)
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
  app.config.globalProperties.$region = 'us-east-2'  // UIstate.region || ''
  app.config.globalProperties.$userPoolId = 'us-east-2_8ME6cnarR'
  app.config.globalProperties.$userPoolWebClientId = '5i6pv7fevmlb8o01uo9vid3knd'
  app.config.globalProperties.$poolId = 'us-east-2:5c8141d8-421b-4a57-abae-543b7623d21b'
  app.config.globalProperties.$host = 'anput1xffmgcz-ats.iot.us-east-2.amazonaws.com'

  app.config.globalProperties.$orderManagerEndpoint='https://wgp3eel343.execute-api.us-east-2.amazonaws.com/Prod'
  app.config.globalProperties.$APIGWEndpointValidatorService = 'https://szxmyl1ki4.execute-api.us-east-2.amazonaws.com/Prod'
  app.config.globalProperties.$APIGWEndpointConfigService = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod'
  app.config.globalProperties.$ConfigEndpoint = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod/config'

  // app.config.globalProperties.$APIconfigURL = UIstate.APIconfigURL || ''
  // app.config.globalProperties.$poolId = UIstate.$poolId || ''
  // app.config.globalProperties.$ConfigEndpoint = UIstate.ConfigEndpoint || '',
  // app.config.globalProperties.$host = UIstate.host || ''
}

// Are global vars initialized?
app.config.globalProperties.$init = false
console.log('Starting with: ', app.config.globalProperties)

// Only init if settings are provided
// if (app.config.globalProperties.$APIurl === '' ||
//     app.config.globalProperties.$region === '' ||
//     app.config.globalProperties.$ordersAPIurl === '' ||
//     app.config.globalProperties.$c === '' ||
//     app.config.globalProperties.$poolId === '' ||
//     app.config.globalProperties.$ConfigEndpoint === '' ||
//     app.config.globalProperties.$host === '') {
//       console.log('Open settings')
//   } else {
    try {
      Amplify.configure({
        Auth: {
          region: app.config.globalProperties.$region,
          identityPoolRegion: app.config.globalProperties.$region,
          userPoolId: app.config.globalProperties.$userPoolId,
          userPoolWebClientId: app.config.globalProperties.$userPoolWebClientId,
          mandatorySignIn: false,
          authenticationFlowType: 'CUSTOM_AUTH',
        }
      })
    } catch (err) {
      console.error('Error: ', err)
    }
    app.config.globalProperties.$init = true
//  }

app.mount('#app')