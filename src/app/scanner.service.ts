import { Injectable, NgZone } from '@angular/core';

@Injectable()
export class ScannerService {

  constructor(
    private ngZone: NgZone
  ) { }

  private getScannerConfiguration(): Object {
    return {
      preferFrontCamera: false, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: 'Zorg dat de QR-code in het vak valt', // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
      // orientation : 'landscape', // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false // iOS and Android
    };
  }

  scan(callback: (result: ScanResult) => void, onError: (error) => void = console.error) {
    this.scanRaw((resultString: string) => {
      // Initiate result
      let result: ScanResult = new ScanResult();
      try {
        // Bind JSON to result
        Object.assign(result, JSON.parse(resultString));
      } catch (e) {
        onError('Could not parse QR-code to json; Reason: ' + e);
      }
      // Now validate if result is valid
      if (result.isValid) {
        callback(result);
      } else {
        onError('Request was invalid. Are you sure the QR has valid "id", "type" and "body"."publicKey" values?');
      }
    }, onError);
  }

  scanRaw(callback: (result: string) => void, onError: (error) => void = console.error) {
    // @ts-ignore
    cordova.plugins.barcodeScanner.scan(
      (result) => this.ngZone.run(() => {
        callback(result.text);
      }),
      onError,
      this.getScannerConfiguration()
    );
  }

}

export class ScanResult {
  private static readonly PUBLIC_KEY = 'publicKey';

  body: Object;
  id: number;
  type: string;

  get isValid(): boolean {
    return this.id > 0 &&
      !!this.type && !!this.type.length &&
      !!this.body && !!this.body[ScanResult.PUBLIC_KEY];
  }

  get shhPublicKey(): string {
    return this.body[ScanResult.PUBLIC_KEY];
  }

}
