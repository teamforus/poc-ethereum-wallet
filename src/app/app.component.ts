import { CurrenciesComponent } from './currencies/currencies.component';
import { IdentitiesComponent } from './identities/identities.component';
import { KeysComponent } from './keys/keys.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Wallet';

  keys = KeysComponent;
  identities = IdentitiesComponent;
  currencies = CurrenciesComponent;
}
