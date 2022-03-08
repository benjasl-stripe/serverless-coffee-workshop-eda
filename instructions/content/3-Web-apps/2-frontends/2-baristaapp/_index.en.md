+++
title = "The Barista App"
weight = 12
+++

The Barista App runs on a tablet next to coffee bar and it's operated by the barista. It provides a list of upcoming orders and enables the barista to mark incoming orders as completed or canceled.

## Inside this section

This frontend has already been deployed and is presented as a hosted UI at https://workshop-barista.serverlesscoffee.com/.

- The hosted UI presents a configuration page when you first visit this URL.
- After entering the configuration settings, it stores these in the browser's local cache.
- The setting you use are not visible to anyone else visiting the same URL.

*Source code for this application:*
* [The Barista App](#)

## Setting up the Barista App

### Step-by-step instructions ###

1. Open a new tab in your browser. We recommend using Chrome or Firefox throughout the workshop.

![Settings page](/images/se-mod3-frontends-barista1.png)

2. Going down the list of settings in the frontend settings page:
- **Region**: enter the Region code you have been using during the workshop (e.g. `us-east-`).
- **UserPoolID**: enter the value from the key `UserPoolID` from the CloudFormation stack.
- **UserPoolWebClientID**: enter the value from the key `UserPoolClient` from the CloudFormation stack.
- **PoolId**: enter TBD.
- **Host**: enter TBD.
- **OrderManagerEndpoint**: enter the value from the key `RESTApiForOrderManager` from the CloudFormation stack.
- **APIGWEndpointValidatorService**: enter the value from the key `RESTApiForValidatorService` from the CloudFormation stack.
- **APIGWEndpointConfigService**: enter the value from the key `RESTApiForConfigService` from the CloudFormation stack.

![Settings page](/images/se-mod3-frontends-barista2.png)

3. Choose **Save and reload**.

![Cognito signin](/images/se-mod3-frontends-barista3.png)

4. Select the *Create Account* tab. Enter a valid email you have access to during the workshop, together with a password. Choose **Create Account**

![Cognito signin completed](/images/se-mod3-backend-display6.png)

5. Enter the verification code from the email and choose **Confirm**.

![Verification code](/images/se-mod3-backend-display7.png)

6. The Barista App is shown.

![Barista App](/images/se-mod3-frontends-barista4.png)

Note the three admin buttons provided on the tool bar:

* **Open store**: This toggles the store open state between *Open* and *Closed*. When the store is closed, the Order App cannot place any new orders.
* **Clear settings**: Empties the local settings cache and clears the backend settings. This causes the *Settings* page to be displayed the next time the page reloads. Use this if you want to change your backend settings.
* **Sign out**: Signs out the Cognito user from the frontend and returns you to the sign-in page.

## Next steps

Next, you will set up the Order App.