import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identityaddkey',
  templateUrl: './identityaddkey.component.html',
  styleUrls: ['./identityaddkey.component.css']
})
export class IdentityaddkeyComponent implements OnInit {
  address = this.route.snapshot.paramMap.get('address');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
