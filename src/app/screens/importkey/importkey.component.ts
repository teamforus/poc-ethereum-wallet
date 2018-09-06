import { ScannerService } from '../../scanner/scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../../vault/vault.service';
import { Web3Service } from '../../web3/web3.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ons-page[importkey]',
  templateUrl: './importkey.component.html',
  styleUrls: ['./importkey.component.css']
})
export class ImportkeyComponent implements OnInit {
  privatekey = '';

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator,
    private scanner: ScannerService
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

  scan() {
    this.scanner.scan((result) => { this.privatekey = result; });
  }

}
