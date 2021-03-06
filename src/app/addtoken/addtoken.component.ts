import { ScannerService } from './../scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[addtoken]',
  templateUrl: './addtoken.component.html',
  styleUrls: ['./addtoken.component.css']
})
export class AddtokenComponent implements OnInit {
  tokenAddress = '';
  allowanceAddress = '';

  constructor(
    public web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator,
    private scanner: ScannerService
  ) { }

  ngOnInit() {
  }

  scan() {
    this.scanner.scan((result) => {
      let resultObj = null;
      try {
        resultObj = JSON.parse(result);
        this.tokenAddress = resultObj.address;
        this.allowanceAddress = resultObj.owner;
      } catch (error) {
        this.tokenAddress = result;
      }
    });
  }

  add() {
    const token = {
      address: this.tokenAddress,
      allowances: new Array<string>()
    };

    if (this.allowanceAddress) {
      token.allowances.push(this.allowanceAddress);
    }

    this.vault.addToken(token);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
