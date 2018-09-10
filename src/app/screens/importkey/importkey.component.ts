import { EthereumService } from './../../ethereum/ethereum.service';
import { ScannerService } from '../../scanner/scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'ons-page[importkey]',
  templateUrl: './importkey.component.html',
  styleUrls: ['./importkey.component.css']
})
export class ImportkeyComponent implements OnInit {
  privatekey = '';

  constructor(
    private eth: EthereumService,
    private navigator: OnsNavigator,
    private scanner: ScannerService
  ) { }

  ngOnInit() {
  }

  importkey() {
    this.eth.accounts.import(this.privatekey);
    this.navigator.element.popPage();
  }

  cancel() {
    this.navigator.element.popPage();
  }

  scan() {
    this.scanner.scan((result) => { this.privatekey = result; });
  }

}
