import { Component } from '@angular/core';
import { KeysPageNavComponent } from '@app/keys-page-nav/keys-page-nav.component';
import { IdentitiesPageNavComponent } from '@app/identities-page-nav/identities-page-nav.component';
import { CurrenciesPageNavComponent } from '@app/currencies-page-nav/currencies-page-nav.component';
import { LoginComponent } from '@app/login/login.component';
import { SettingsComponent } from '@app/settings/settings.component';
import { TransactionComponent } from '@app/transaction/transaction.component';

@Component({
  selector: 'ons-page[home]',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  keys = KeysPageNavComponent;
  identities = IdentitiesPageNavComponent;
  currencies = CurrenciesPageNavComponent;
  login = LoginComponent;
  settings = SettingsComponent;
  transaction = TransactionComponent;
}
