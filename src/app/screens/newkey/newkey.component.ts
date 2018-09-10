import { OnsNavigator } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';
import { EthereumService } from '../../ethereum/ethereum.service';

@Component({
  selector: 'ons-page[newkey]',
  templateUrl: './newkey.component.html',
  styleUrls: ['./newkey.component.css']
})
export class NewkeyComponent implements OnInit {

  constructor(
    private eth: EthereumService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
  }

  generateKey() {
    this.eth.accounts.new();
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
