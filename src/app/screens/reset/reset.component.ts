import { Router } from '@angular/router';
import { VaultService } from './../../vault/vault.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(
    private vault: VaultService,
    private router: Router
  ) { }

  ngOnInit() {
    this.vault.reset();
    this.router.navigate(['/']);
  }

}
