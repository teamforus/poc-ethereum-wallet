import { OnsNavigator } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../../web3/web3.service';
import { Router } from '@angular/router';
import { VaultService } from './../../vault/vault.service';

@Component({
  selector: 'ons-page[newkey]',
  templateUrl: './newkey.component.html',
  styleUrls: ['./newkey.component.css']
})
export class NewkeyComponent implements OnInit {

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
  }

  generateKey() {
    const newAccount = this.web3Service.web3.eth.accounts.create();
    this.vault.addKey(newAccount.privateKey);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
