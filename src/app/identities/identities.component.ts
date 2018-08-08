import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';
import { Identity as VaultIdentity } from '../vault/identity';

@Component({
  selector: 'ons-page[identities]',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css']
})
export class IdentitiesComponent implements OnInit {
  identities: VaultIdentity[];

  constructor(private vault: VaultService) { }

  ngOnInit() {
    this.identities = this.vault.getIdentities();
  }

}
