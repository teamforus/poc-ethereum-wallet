import { Router, ActivatedRoute } from '@angular/router';
import { Web3Service } from '@app/web3.service';
import { Component, OnInit } from '@angular/core';
import * as Erc20 from '@contracts/erc20.js';
import { VaultService } from '@app/vault/vault.service';
import { Key } from '@app/vault/key';

@Component({
  selector: 'app-createvoucher',
  templateUrl: './createvoucher.component.html',
  styleUrls: ['./createvoucher.component.css']
})
export class CreateVoucherComponent implements OnInit {
  amount = 0;
  balance = 0;
  contract;
  currentVoucher = 0;
  key: Key;
  requesterAddress = '';
  voucherAddress = '';
  voucherName = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vault: VaultService,
    public web3Service: Web3Service
  ) {
    this.key = this.vault.getKeyByAddress(this.route.snapshot.paramMap.get('sponsorAddress'));
    this.voucherAddress = this.route.snapshot.paramMap.get('tokenAddress');
    this.contract = new web3Service.web3.eth.Contract(Erc20.abi, this.voucherAddress);
  }

  async ngOnInit() {
    this.balance = await this.contract.methods.balanceOf(this.key.address).call();
    this.voucherName = await this.contract.methods.name().call();
  }

  async create() {
    const method = this.contract.methods.approve(this.requesterAddress, this.amount);
    const trx = {
      // nonce: this.vault.getNonce(),
      from: this.key.address,
      to: this.voucherAddress,
      chainId: this.web3Service.chainId,
      gas: 3000000,
      data: method.encodeABI()
    };

    const receipt = await this.web3Service.web3.eth.accounts.signTransaction(trx, this.key.key)
    .then((sgnTrx) => {
      return this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((result) => {
      return result;
    }).catch((error) => {
      throw new Error(error);
    });

    if ('true' === receipt.status) {
      console.log(receipt);
      throw new Error('Could not create voucher');
    }

    this.router.navigate(['/vouchers']);
  }

  get voucherLabel(): string {
    return this.voucherName + ' (' + this.balance + ')';
  }

  async update() {
    if (this.web3Service.web3.utils.isAddress(this.requesterAddress)) {
      this.currentVoucher = await this.contract.methods.allowance(this.key.address, this.requesterAddress).call();
    } else {
      this.currentVoucher = 0;
    }
  }

}
