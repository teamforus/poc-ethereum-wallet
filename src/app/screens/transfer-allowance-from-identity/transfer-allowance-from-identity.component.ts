import { ScannerService } from './../../scanner.service';
import { Identity } from './../../vault/identity';
import { Key } from './../../vault/key';
import { VaultService } from './../../vault/vault.service';
import { Web3Service } from '../../web3/web3.service';
import { Component, OnInit, HostListener } from '@angular/core';
import * as Erc20ContractData from './../../../contracts/erc20.js';
import * as IdentityContractData from './../../../contracts/identity.js';
import { environment } from './../../../environments/environment';
import { Params, OnsNavigator } from 'ngx-onsenui';
import * as ons from 'onsenui';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[transfer-allowance-from-identity]',
  templateUrl: './transfer-allowance-from-identity.component.html',
  styleUrls: ['./transfer-allowance-from-identity.component.css']
})
export class TransferAllowanceFromIdentityComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  identity: Identity;
  key: Key;
  balance: 0;
  managementkeys: Key[] = new Array<Key>();
  managementkey = '';
  tokenContract: Object;
  toAddress = '';
  toValue = 0 ;

  constructor(
    private vault: VaultService,
    private web3Service: Web3Service,
    private params: Params,
    private navigator: OnsNavigator,
    private scanner: ScannerService
  ) { }

  ngOnInit() {
    this.identity = this.vault.getIdentity(this.params.data.allowanceSpenderAddress);
    this.tokenContract = new this.web3Service.web3.eth.Contract(
      Erc20ContractData.abi,
      this.params.data.tokenAddress
    );
    this.managementkeys = this.vault.getManagementKeys(this.identity.address);
    // @ts-ignore
    this.balance = this.tokenContract.methods.allowance(this.params.data.allowanceOwnerAddress, this.identity.address).call();

    this.toAddress = '';
    this.toValue = 0 ;
    this.screenStatus = ScreenStatus.Start;}

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('transfer-allowance-from-identity' === event.target.id) {
      this.ngOnInit();
    }
  }

  async transfer() {
    this.screenStatus = ScreenStatus.Busy;
    const senderContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      this.identity.address,
      null
    );

    const trx = {
      to: senderContract.options.address,
      gas: environment.gas,
      data: senderContract.methods.execute(
        // @ts-ignore
        this.tokenContract.options.address,
        0,
        // @ts-ignore
        this.tokenContract.methods.transferFrom(
          this.params.data.allowanceOwnerAddress,
          this.toAddress,
          this.toValue
        ).encodeABI()
      ).encodeABI()
    };

    if (this.web3Service.chainId) {
      // @ts-ignore
      trx.chainId = this.web3Service.chainId;
    }

    await this.web3Service.sendSignedTransaction(trx, this.vault.getKeyByAddress(this.managementkey).key);
    ons.notification.toast('Allowance successfuly transfered', {timeout: 5000});
    this.navigator.element.popPage();
  }

  scan() {
    this.scanner.scan((result) => {
      this.toAddress = result;
    });
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
