import { CurrenciesComponent } from './../currencies/currencies.component';
import { Component } from '@angular/core';

@Component({
  selector: 'ons-page[currencies-page-nav]',
  templateUrl: './currencies-page-nav.component.html',
  styleUrls: ['./currencies-page-nav.component.css']
})
export class CurrenciesPageNavComponent {
  initialPage = CurrenciesComponent;
}
