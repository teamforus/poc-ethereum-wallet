import { TransactionComponent } from './screens/transaction/transaction.component';
import { IdentitiesPageNavComponent } from './screens/identities-page-nav/identities-page-nav.component';
import { CurrenciesPageNavComponent } from './screens/currencies-page-nav/currencies-page-nav.component';
import { KeysPageNavComponent } from './screens/keys-page-nav/keys-page-nav.component';
import { Component } from '@angular/core';
import { LoginComponent } from './screens/login/login.component';
import { SettingsComponent } from './screens/settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wallet';

  keys = KeysPageNavComponent;
  identities = IdentitiesPageNavComponent;
  currencies = CurrenciesPageNavComponent;
  login = LoginComponent;
  settings = SettingsComponent;
  transaction = TransactionComponent;
}
