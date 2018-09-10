import { EthereumService } from './../../ethereum/ethereum.service';
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
    public web3Service: Web3Service,
    private eth: EthereumService
  ) { }

  ngOnInit() {
  }

  reset() {
    this.vault.reset();
    this.eth.accounts.clear();
  }

}
