import { Web3Service } from '../../web3/web3.service';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[settings]',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
  }

  reset() {
    this.vault.reset();
  }

}
