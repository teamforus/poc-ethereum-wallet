import { ScannerService } from '@app/scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from '@app/vault/vault.service';
import { Web3Service } from '@app/web3.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ons-page[import-key]',
  templateUrl: './import-key.component.html',
  styleUrls: ['./import-key.component.css']
})
export class ImportKeyComponent implements OnInit {
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

  private get hasKey(): boolean {
    return this.privatekey.length > 0;
  }

  scan() {
    this.scanner.scanRaw((result) => { this.privatekey = result; });
  }

}
