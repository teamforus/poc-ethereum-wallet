import { Web3Service } from './../web3.service';
import { Identity } from './../vault/identity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VaultService } from './../vault/vault.service';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  identity: Identity;
  balance: 0;

  constructor(
    private route: ActivatedRoute,
    private vault: VaultService,
    private web3Service: Web3Service
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.route.snapshot.paramMap.get('address'));
    this.web3Service.web3.eth.getBalance(this.identity.address).then((balance) => { this.balance = balance; });
  }

}
