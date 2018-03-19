import { Web3Service } from './../web3.service';
import { Key } from './../vault/key';
import { ActivatedRoute, Router } from '@angular/router';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-from-key',
  templateUrl: './transfer-from-key.component.html',
  styleUrls: ['./transfer-from-key.component.css']
})
export class TransferFromKeyComponent implements OnInit {
  key: Key;
  balance: 0;
  toAddress: string;
  toValue: number;

  constructor(
    private vault: VaultService,
    private route: ActivatedRoute,
    private web3Service: Web3Service,
    private router: Router
  ) { }

  ngOnInit() {
    this.key = this.vault.getKeyByAddress(this.route.snapshot.paramMap.get('address'));
    this.web3Service.web3.eth.getBalance(this.key.address).then((balance) => { this.balance = balance; });
  }

  async transfer() {
    const trx = {
      // nonce: this.vault.getNonce(),
      from: this.key.address,
      to: this.toAddress,
      chainId: this.web3Service.chanId,
      gas: 3000000,
      value: this.toValue
    };

    const receipt = await this.web3Service.web3.eth.accounts.signTransaction(trx, this.key.key)
    .then((sgnTrx) => {
      return this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((result) => {
      return result;
    }).catch((error) => {
      throw new Error(error);
    });

    if (1 !== this.web3Service.web3.utils.hexToNumber(receipt.status)) {
      console.log(receipt);
      throw new Error('Error transferring ether');
    }

    this.router.navigate(['/keys']);

  }

}
