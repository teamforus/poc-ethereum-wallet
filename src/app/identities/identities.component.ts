import { NewIdentityComponent } from '@app/register/new-identity/new-identity.component';
import { IdentityComponent } from './../identity/identity.component';
import { OnsNavigator } from 'ngx-onsenui';
import { VaultService } from './../vault/vault.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';
import { ImportIdentityComponent } from '@app/register/import-identity/import-identity.component';
import { IdentityService } from '@app/identity.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ons-page[identities]',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent implements OnInit {
  identities: Observable<VaultIdentity[]>;

  constructor(
    private _identityService: IdentityService,
    private _navigator: OnsNavigator
  ) { }

  ngOnInit() {}

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if ('identities' === event.target.id) {
    this.identities = this._identityService.getIdentities();
    }
  }

  show(address) {
    this._navigator.element.pushPage(IdentityComponent, {data: {address: address}});
  }

  newIdentity() {
    this._navigator.element.pushPage(NewIdentityComponent, {data: {}});
  }

  importIdentity() {
    this._navigator.element.pushPage(ImportIdentityComponent);
  }

}
