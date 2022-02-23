<template>
  <div v-show="false">
    <canvas id="canvas" width="512" height="480"></canvas>
    <img id="logo" crossOrigin="Anonymous" src="https://da-public-assets.s3.amazonaws.com/serverlesspresso/images/logo-serverlesspresso-inverse.bmp">
  </div>
</template>

<script>
/*! Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *  SPDX-License-Identifier: MIT-0
 */

'use strict'

/* eslint-disable */
const builder = require('@/lib/printing.js')

export default {

  name: 'Printing',
  data() {
    return {
      deviceId: 'local_printer',
      protocol: ''
    }
  },
  mounted () {
    let that = this

    this.protocol = (process.env.NODE_ENV === 'production' ? 'https' : 'http')
    console.log('Protocol set to ', this.protocol, process.env.NODE_ENV)

    // Configure logo graphic
    const c = document.getElementById("canvas")
    const ctx = c.getContext("2d")
    const logo = document.getElementById("logo")

    // Receive event to print order
    this.emitter.on('printOrder', function(order) {
      // Check printer is configured
      const ipAddr = localStorage.printerIPaddress
      if (!ipAddr) return console.log('No printer configured - canceled printing')
      console.log('Printing to :', ipAddr)

      ctx.drawImage(logo, 0, 0, 400, 105)
      const builder = new epson.ePOSBuilder()
      console.log('Printing::mounted: ', order, ctx)

      // Paper layout
      builder.addLayout(builder.LAYOUT_RECEIPT, 580)

      // Initialize (ank mode, smoothing)
      builder.addTextLang('en').addTextSmooth(true)

      // Append raster image
      builder.addTextAlign(builder.ALIGN_CENTER)
      builder.addImage(ctx, 0, 0, 415, 105)
      builder.addFeedLine(1)

      // Add ticket number
      builder.addTextAlign(builder.ALIGN_CENTER)
      builder.addTextDouble(true, false).addText('Order number')
      builder.addTextDouble(false, false).addText('\n')
      builder.addFeedUnit(16)
      builder.addTextAlign(builder.ALIGN_CENTER);
      builder.addTextSize(6, 4).addText(order.orderNumber)
      builder.addTextSize(1, 1).addText('\n')
      builder.addFeedUnit(16)

      // Add message
      builder.addTextStyle(false, false, true)
      builder.addText(order.orderItemName + '\n')
      builder.addText(order.modifiers.join(' | ') + '\n')
      builder.addTextStyle(false, false, false)
      builder.addTextSize(1, 1).addText('\n')
      builder.addFeedUnit(16)

      builder.addTextStyle(false, false, false)
      builder.addText('To learn more about this application,\n')
      builder.addText('visit https://s12d.com/espresso.\n')

      builder.addTextStyle(false, false, false)
      builder.addFeedUnit(32)

      // append date and time
      const now = new Date()
      builder.addText(now.toDateString() + ' ' + now.toTimeString().slice(0, 8) + '\n')
      builder.addFeedUnit(160)

      // Add paper cut
      builder.addCut()

      // Send to printer
      const url = `${that.protocol}://${ipAddr}/cgi-bin/epos/service.cgi?devid=${that.deviceId}&timeout=10000`
      console.log('URL: ', url)
      const epos = new epson.ePOSPrint(url)
      epos.send(builder.toString())

      // Success/failure callbacks
      epos.onreceive = function (res) {
        console.log('Printing response: ', res)
      }

      // register callback function
      epos.onerror = function (err) {
        console.error('Printing response: ', err)
      }
    })
  }
}
</script>
