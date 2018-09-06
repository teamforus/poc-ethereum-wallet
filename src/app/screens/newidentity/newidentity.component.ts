import { OnsNavigator } from 'ngx-onsenui';
import { Key } from './../../vault/key';
import { VaultService } from './../../vault/vault.service';
import { Web3Service } from '../../web3/web3.service';
import { Component, OnInit, HostListener } from '@angular/core';
import * as IdentityContractData from './../../../contracts/identity.js';
import { environment } from './../../../environments/environment';
import * as ons from 'onsenui';

enum ScreenStatus {
  Start,
  Busy,
  Done
}

@Component({
  selector: 'ons-page[newidentity]',
  templateUrl: './newidentity.component.html',
  styleUrls: ['./newidentity.component.css']
})
export class NewidentityComponent implements OnInit {
  ScreenStatus = ScreenStatus;
  screenStatus: ScreenStatus = ScreenStatus.Start;
  keys: Key[] = new Array<Key>();
  name = '';
  managementkey = '';

  constructor(
    public web3Service: Web3Service,
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.keys = this.vault.getKeys();
    this.name = '';
    this.managementkey = '';
    this.screenStatus = ScreenStatus.Start;
  }

  @HostListener('window:show', ['$event'])
  async onShow(event) {
    if ('newidentity' === event.target.id) {
      this.ngOnInit();
      await this.web3Service.checkConnection();
    }
  }

  async save() {
    this.screenStatus = ScreenStatus.Busy;
    const keyAccount = this.web3Service.web3.eth.accounts.privateKeyToAccount(this.managementkey);
    const identityAddress = await this.deployIdentityContract(keyAccount);
    this.vault.addIdentity(this.name, identityAddress, keyAccount.privateKey);
    ons.notification.toast('Identity "' + this.name + '" successfuly created', {timeout: 5000});
    this.navigator.element.popPage();
  }

  private async deployIdentityContract(senderAccount) {

    const IdentityContract = new this.web3Service.web3.eth.Contract(
      IdentityContractData.abi,
      null,
      null
    );

    let contractBin = IdentityContractData.bin;

    environment.libAddrMap.forEach((addrMap) => {
      const placeholder = ('__' + addrMap.libName + '.sol:' + addrMap.libName).padEnd(40, '_');
      contractBin = contractBin.replace(new RegExp(placeholder, 'g'), addrMap.address);
    });

    const deploy = IdentityContract.deploy(
      { data: contractBin }
    );

    const trx = {
      gas: environment.gas,
      data: deploy._deployData
    };

    if (this.web3Service.chainId) {
      // @ts-ignore
      trx.chainId = this.web3Service.chainId;
    }

    const contractAddress = await this.web3Service.web3.eth.accounts.signTransaction(trx, senderAccount.privateKey)
    .then((sgnTrx) => {
      return this.web3Service.web3.eth.sendSignedTransaction(sgnTrx.rawTransaction);
    }).then((receipt) => {
      if ('true' === receipt.status) {
        console.log(receipt);
        throw new Error('Could not deploy contract');
      }
      return receipt.contractAddress;
    }).catch((error) => {
      throw new Error(error);
    });

    return contractAddress;
  }

  cancel() {
    this.navigator.element.popPage();
  }

}
