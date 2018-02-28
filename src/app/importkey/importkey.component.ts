import { async } from '@angular/core/testing';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-importkey',
  templateUrl: './importkey.component.html',
  styleUrls: ['./importkey.component.css']
})
export class ImportkeyComponent implements OnInit {
  privatekey = '';

  constructor(
    private web3Service: Web3Service,
    private vault: VaultService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  importkey() {
    const account = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.privatekey);
    this.vault.addKey(account.privateKey);
    this.router.navigate(['/keys']);
  }

}
