import { Router } from '@angular/router';
import { VaultService } from './../vault/vault.service';
import { Web3Service } from './../web3.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addvoucher',
  templateUrl: './addvoucher.component.html',
  styleUrls: ['./addvoucher.component.css']
})
export class AddvoucherComponent implements OnInit {
  sponsorAddress = '';
  voucherAddress = '';

  constructor(
    public web3Service: Web3Service,
    private vault: VaultService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  add() {
    this.vault.addVoucher(this.voucherAddress, this.sponsorAddress);
    this.router.navigate(['/vouchers']);
  }

}
