import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScannerService {

  constructor(
    private ngZone: NgZone
  ) { }

  scan(callback: (result: string) => void) {
    // @ts-ignore
    cordova.plugins.barcodeScanner.scan(
      (result) => this.ngZone.run(() => {
        callback(result.text);
      }),
        (error) => {},
      {
        preferFrontCamera : false, // iOS and Android
        showFlipCameraButton : true, // iOS and Android
        showTorchButton : true, // iOS and Android
        torchOn: false, // Android, launch with the torch switched on (if available)
        saveHistory: true, // Android, save scan history (default false)
        prompt : "Place a barcode inside the scan area", // Android
        resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
        formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
        // orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
        disableAnimations : true, // iOS
        disableSuccessBeep: false // iOS and Android
      }
    );
  }

}
