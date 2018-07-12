import { Router } from '@angular/router';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addtoken',
  templateUrl: './addtoken.component.html',
  styleUrls: ['./addtoken.component.css']
})
export class AddtokenComponent implements OnInit {
  tokenAddress = '';

  constructor(
    public web3Service: Web3Service,
    private vault: VaultService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  add() {
    this.vault.addToken(this.tokenAddress);
    this.router.navigate(['/currencies']);
  }

}
