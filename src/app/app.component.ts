import { KeysPageNavComponent } from './keys-page-nav/keys-page-nav.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { IdentitiesComponent } from './identities/identities.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wallet';

  keys = KeysPageNavComponent;
  identities = IdentitiesComponent;
  currencies = CurrenciesComponent;
}
