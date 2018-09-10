import { Address } from './../../ethereum/types';
import { EthereumService } from './../../ethereum/ethereum.service';
import { OnsNavigator, Params } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[key]',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  address: Address;

  constructor(
    private eth: EthereumService,
    private navigator: OnsNavigator,
    private params: Params
  ) { }

  async ngOnInit() {
    this.address = (await this.eth.accounts.get(this.params.data.address)).getAddress();
  }

  back() {
    this.navigator.element.popPage();
  }

}
