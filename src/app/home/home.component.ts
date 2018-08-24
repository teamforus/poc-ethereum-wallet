import { Component } from '@angular/core';
import { IdentitiesPageNavComponent } from '@app/identities-page-nav/identities-page-nav.component';
import { CurrenciesPageNavComponent } from '@app/currencies-page-nav/currencies-page-nav.component';
import { ScanComponent } from '@app/scan/scan.component';
import { OnsNavigator } from 'ngx-onsenui';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  currencies = CurrenciesPageNavComponent;
  identities = IdentitiesPageNavComponent;
  scan = ScanComponent;

  static GoToHome(navigator: OnsNavigator) {
    navigator.element.resetToPage(HomeComponent);
  }
}
