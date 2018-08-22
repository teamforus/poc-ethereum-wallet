import { Component, OnInit } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { ImportkeyComponent } from '@app/importkey/importkey.component';
import { NewKeyComponent } from '@app/register/new-key/new-key.component';

@Component({
  selector: 'ons-page[welcome]',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(
    private _navigator: OnsNavigator
  ) { }

  private importUser() {
    this._navigator.element.pushPage(ImportkeyComponent);
  }

  private newUser() {
    this._navigator.element.pushPage(NewKeyComponent);

  }

}
