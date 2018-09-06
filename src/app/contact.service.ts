import { Injectable } from '@angular/core';
import * as environment from './../environments/environment';

@Injectable()
export class ContactService {

  constructor() { }

  getContacts() {
    // @ts-ignore
    console.log(cordova.plugins.contacts);
  }

}
