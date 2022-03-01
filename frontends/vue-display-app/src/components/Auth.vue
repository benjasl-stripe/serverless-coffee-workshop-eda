<script setup>
  import { Authenticator } from '@aws-amplify/ui-vue'
  import { Auth, Hub } from 'aws-amplify'
  import '@aws-amplify/ui-vue/styles.css'
</script>

<template>
  <div class="row parent">
    <div class="flex md6 lg6 mt-4">
      <authenticator>
        <template v-slot="{ user, signOut }">
          <h1>Hello {{ user.username }}!</h1>
          <button @click="signOut">Sign Out</button>
        </template>
      </authenticator>
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
      cognitoUser: {},
    }
  },
  async mounted () {
    console.log('Auth mounted')
    this.emitter.on('signOut', async () => (await this.signOut ()))

    if (localStorage.UIstate) {
      const UIstate = JSON.parse(localStorage.UIstate)
      console.log('Mounted - Local storage: ', UIstate)
      this.phone = UIstate.phone
    }

    try {
      await this.checkIfLoggedIn ()
    } catch (err) {
      console.error ('Mounted: ', err)
    }
    this.isLoading = false

    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
            console.log('user signed in')
            this.checkIfLoggedIn()
            break
        case 'signUp':
            console.log('user signed up')
            this.checkIfLoggedIn()
            break
        case 'signOut':
            console.log('user signed out')
            this.emitter.emit('authStateChanged', { loggedIn: false })
            break
        case 'signIn_failure':
            console.log('user sign in failed')
            break
        case 'configured':
            console.log('the Auth module is configured')
      }
    })

  },
  methods: {
    async checkIfLoggedIn () {
      const loggedIn = await this.isAuthenticated()
      console.log("checkIfLoggedIn: ", loggedIn)

      if (loggedIn) {
        const session = await Auth.currentSession()
        console.log(session)

        // Check if admin requirements are met
        if (this.$adminApp) {
          const groups = session.getIdToken().payload['cognito:groups']
          console.log('Groups: ', groups)

          if (!groups || !groups.includes('admin')) {
            console.log('Not an admin - signing out')
            await this.signOut()
            return
          }
        }
        this.$nextTick(() => {
          console.log('Auth emitting authStateChanged')
          this.emitter.emit('authStateChanged', { loggedIn: true, authData: session })
        })
      } else {
        this.errorMessages = "Invalid"
      }
    },
    async signOut() {
      await Auth.signOut()
      this.emitter.emit('authStateChanged', { loggedIn: false })
    },
    async isAuthenticated() {
      try {
        await Auth.currentSession()
        return true
      } catch {
        return false
      }
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
.phone {
  font-size: x-large
}
.code {
  font-size: x-large !important;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 100px;
  padding-right: 100px;
}
</style>