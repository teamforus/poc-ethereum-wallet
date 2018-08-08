import { OnsNavigator } from 'ngx-onsenui';
import { async } from '@angular/core/testing';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ons-page[importkey]',
  templateUrl: './importkey.component.html',
  styleUrls: ['./importkey.component.css']
})
export class ImportkeyComponent implements OnInit {
  privatekey = '0x00351d8f054a232c52d86b6bf4acd372b6a844ab874e8508bb5b1e8117e47414';

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
  }

  importkey() {
    const account = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.privatekey);
    this.vault.addKey(account.privateKey);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
