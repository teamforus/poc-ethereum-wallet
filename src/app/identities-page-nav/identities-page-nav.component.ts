import { IdentitiesComponent } from './../identities/identities.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ons-page[identities-page-nav]',
  templateUrl: './identities-page-nav.component.html',
  styleUrls: ['./identities-page-nav.component.css']
})
export class IdentitiesPageNavComponent {
  initialPage = IdentitiesComponent;

}
