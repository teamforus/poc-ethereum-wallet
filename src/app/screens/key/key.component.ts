import { Account } from './../../ethereum/account';
import { EthereumService } from './../../ethereum/ethereum.service';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[key]',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  account: Promise<Account>;

  constructor(
    private eth: EthereumService,
    private navigator: OnsNavigator,
    private params: Params
  ) { }

  async ngOnInit() {
    this.account = this.eth.accounts.get(this.params.data.address);
  }

  back() {
    this.navigator.element.popPage();
  }

}
