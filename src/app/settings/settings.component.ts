import { VaultService } from './../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ons-page[settings]',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private vault: VaultService
  ) { }

  ngOnInit() {
  }

  reset() {
    this.vault.reset();
  }

}
