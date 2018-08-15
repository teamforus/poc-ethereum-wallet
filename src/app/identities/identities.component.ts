import { NewidentityComponent } from './../newidentity/newidentity.component';
import { IdentityComponent } from './../identity/identity.component';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';
import { ImportidentityComponent } from '../importidentity/importidentity.component';

@Component({
  selector: 'ons-page[identities]',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent implements OnInit {
  identities: VaultIdentity[];

  constructor(
    private vault: VaultService,
    private navigator: OnsNavigator
  ) { }

  ngOnInit() {
    this.identities = this.vault.getIdentities();
  }

  show(address) {
    this.navigator.element.pushPage(IdentityComponent, {data: {address: address}});
  }

  new() {
    this.navigator.element.pushPage(NewidentityComponent);
  }

  importIdentity() {
    this.navigator.element.pushPage(ImportidentityComponent);
  }

}
