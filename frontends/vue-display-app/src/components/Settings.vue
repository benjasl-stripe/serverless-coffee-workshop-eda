<template>
  <div class="row parent">
    <div class="flex md6 lg6">
        <va-card :bordered="false" style="margin-top: 20px;">
          <va-card-title>Add your backend settings</va-card-title>
          <va-card-content>This hosted UI will connect to the backend stack you deploy in the workshop. Enter the environment variables and stack parameters from your backend.</va-card-content>

          <!-- Fields -->
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="Region (e.g. us-west-2)"
              v-model="region"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="userPoolId (e.g. us-east-1_ABcDEFgH2)"
              v-model="userPoolId"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="userPoolWebClientId (e.g. 123a456bcde789fghi012jkl)"
              v-model="userPoolWebClientId"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="poolId (e.g. us-east-1:abcd1234-abcd-abcd-a123-abc123abc12)"
              v-model="poolId"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="Host (e.g.a1bc2c45d6fgh7-ats.iot.us-east-1.amazonaws.com)"
              v-model="host"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="orderManagerEndpoint"
              v-model="orderManagerEndpoint"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="APIGWEndpointValidatorService"
              v-model="APIGWEndpointValidatorService"
            />
          </div>
          <div class="row flex" style="margin: 20px;">
            <va-input
              style="font-size: 24px;"
              label="APIGWEndpointConfigService"
              v-model="APIGWEndpointConfigService"
            />
          </div>

          <!-- Save button -->
          <div class="row flex">
            <div class="row flex" style="margin: 20px;">
              <va-button
                :rounded="false"
                @click="saveLocalStorage"
                class="mr-2">
                  Save and reload
              </va-button>
            </div>
          </div>
        </va-card>
    </div>
  </div>
</template>

<script>
/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

export default {
  name: 'Auth',
  data() {
    return {
      region: '',
      userPoolId: '',
      userPoolWebClientId: '',
      poolId: '',
      host: '',
      orderManagerEndpoint: '',
      APIGWEndpointValidatorService : '',
      APIGWEndpointConfigService: ''
    }
  },
  async mounted () {
    if (localStorage.UIstate) {
      const UIstate = JSON.parse(localStorage.UIstate)
      console.log('Mounted - Local storage: ', UIstate)
      this.region = UIstate.region || ''
      this.userPoolId = UIstate.userPoolId || ''
      this.userPoolWebClientId = UIstate.userPoolWebClientId || ''
      this.poolId = UIstate.poolId || ''
      this.host = UIstate.host || ''
      this.orderManagerEndpoint = UIstate.orderManagerEndpoint || ''
      this.APIGWEndpointValidatorService = UIstate.APIGWEndpointValidatorService || ''
      this.APIGWEndpointConfigService = UIstate.APIGWEndpointConfigService || ''
    }
  },
  methods: {
    saveLocalStorage () {
      const UIstate = {
        region: this.region,
        userPoolId: this.userPoolId,
        userPoolWebClientId: this.userPoolWebClientId,
        poolId: this.poolId,
        host: this.host,
        orderManagerEndpoint: this.orderManagerEndpoint,
        APIGWEndpointValidatorService : this.APIGWEndpointValidatorService,
        APIGWEndpointConfigService: this.APIGWEndpointConfigService,
      }
      console.log('Saving Local storage: ', UIstate)

      localStorage.UIstate = JSON.stringify(UIstate)
      console.log('Saving: ', UIstate)
      // Reload page
      window.location.reload()
    }
  }
}
</script>
<style>
.parent {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
</style>