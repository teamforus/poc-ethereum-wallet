import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  address = this.route.snapshot.paramMap.get('address');

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
