import { Component, OnInit, ViewChild } from '@angular/core';
import { TokensComponent } from '@app/currencies/tokens/tokens.component';
import { OnsTabbarElement } from 'onsenui';
import { VouchersComponent } from '@app/currencies/vouchers/vouchers.component';


@Component({
  selector: 'ons-page[currencies]',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit {
  @ViewChild('currenciesTab') private _currenciesTabbar: OnsTabbarElement;
  private _tokens = TokensComponent;
  private _vouchers = VouchersComponent;

  ngOnInit(): void {

  }
}
