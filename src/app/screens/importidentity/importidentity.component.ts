import { ScannerService } from '../../scanner/scanner.service';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[importidentity]',
  templateUrl: './importidentity.component.html',
  styleUrls: ['./importidentity.component.css']
})
export class ImportidentityComponent implements OnInit {
  address = '';
  name = '';

  constructor(
    private vault: VaultService,
    private navigator: OnsNavigator,
    private scanner: ScannerService
  ) { }

  ngOnInit() {
  }

  cancel() {
    this.navigator.element.popPage();
  }

  scan() {
    this.scanner.scan((result) => { this.address = result; });
  }

  importidentity() {
    this.vault.addIdentity(this.name, this.address);
    this.navigator.element.popPage();
  }

}
