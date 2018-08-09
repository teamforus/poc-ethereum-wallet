import { KeysComponent } from './../keys/keys.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[keys-page-nav]',
  templateUrl: './keys-page-nav.component.html',
  styleUrls: ['./keys-page-nav.component.css']
})
export class KeysPageNavComponent {
  initialPage = KeysComponent;
}
