import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identitykeys',
  templateUrl: './identitykeys.component.html',
  styleUrls: ['./identitykeys.component.css']
})
export class IdentitykeysComponent implements OnInit {
  address = this.route.snapshot.paramMap.get('address');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
