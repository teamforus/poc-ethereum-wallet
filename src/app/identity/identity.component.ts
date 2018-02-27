import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {
  address = this.route.snapshot.paramMap.get('address');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
