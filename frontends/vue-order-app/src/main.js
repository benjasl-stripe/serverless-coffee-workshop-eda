import { createApp } from 'vue'
import App from './App.vue'
import { VuesticPlugin } from 'vuestic-ui' 
import 'vuestic-ui/dist/vuestic-ui.css' 
import Toaster from '@meforma/vue-toaster';

// Global event bus
import mitt from 'mitt';
const emitter = mitt();

// Phone number handling
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'

// Amplify imports
import Amplify from 'aws-amplify'
//import aws_exports from './aws-exports';

//import {
  //applyPolyfills,
//  defineCustomElements,
//} from '@aws-amplify/ui-components/loader';


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

// // You can get the current config object
// Auth.configure()
// //Amplify.configure(aws_exports);
// applyPolyfills().then(() => {
//   defineCustomElements(window)
// })

const app = createApp(App)
app.use(VuesticPlugin,{
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
    },
    VaProgressCircle:{
      color:'#08c18a'
    },
    VaButtonDropdown:{
      color:'#08c18a'
    }
    
  },
}).use(VueTelInput).use(Toaster)

/* ===================================================
                      CONFIGURATION
    You must add your own values here! See the tutorial
    in the GitHub repo for more information. @jbesw
   =================================================== */


// ** Websocket connection **
//  PoolId: Retrieve this with the CLI command: aws cognito-identity list-identity-pools --max-results 10 --region <<REGION>>
app.config.globalProperties.$poolId = 'us-east-2:5c8141d8-421b-4a57-abae-543b7623d21b' // 'YourCognitoIdentityPoolId'
//  IoTendpoint: Retrieve this with the CLI command: aws iot describe-endpoint --endpoint-type iot:Data-ATS --region us-west-2
app.config.globalProperties.$host = 'anput1xffmgcz-ats.iot.us-east-2.amazonaws.com' // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'

app.config.globalProperties.$region = 'us-east-2'      

//APIGW OrderManager Service**
app.config.globalProperties.$orderManagerEndpoint='https://wgp3eel343.execute-api.us-east-2.amazonaws.com/Prod'

// **APIGW  Validator Service **
app.config.globalProperties.$APIGWEndpointValidatorService = 'https://szxmyl1ki4.execute-api.us-east-2.amazonaws.com/Prod'

// **APIGW config Service **
app.config.globalProperties.$APIGWEndpointConfigService = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod'

// ** readonly config store endpoint **
app.config.globalProperties.$ConfigEndpoint = 'https://1lo0k59n5g.execute-api.us-east-2.amazonaws.com/Prod/config'

// ** readonly config store endpoint **
app.config.globalProperties.$journeyServiceURL = 'https://d1mt6zclpinn6p.cloudfront.net/' 


app.config.globalProperties.emitter = emitter
app.config.globalProperties.$adminApp = false
app.mount('#app')

