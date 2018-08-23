import { Component, ViewChild, OnInit, HostListener } from '@angular/core';
import { OnsNavigator } from 'ngx-onsenui';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '@app/register/welcome/welcome.component';
import { VaultService } from '@app/vault/vault.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('navigator') private navigator: OnsNavigator;
  title = 'Wallet';

  // todo DEBUG
  private _countDown = 3;

  constructor(
    private _vaultService: VaultService
  ) {}

  ngOnInit() {
    setTimeout(this.redirect.bind(this), 3000);
  }

  @HostListener('window:show', ['$event'])
  onShow(event) {
    if (!!this._vaultService && 'app-root' === event.target.id) {
      this.redirect();
    }
  }

  private redirect() {
    if (this._vaultService.hasKey) {
      this.redirectToHome();
    } else {
      this.navigator.nativeElement.resetToPage(WelcomeComponent, {animation: 'fade'});
    }
  }

  private redirectToHome() {
    this.navigator.nativeElement.resetToPage(HomeComponent, {animation: 'fade'});
  }

  resetPressed() {
    if (this._countDown > 0) {
      this._countDown -= 1;
    }
    if (this._countDown <= 0) {
      this._vaultService.reset();
    }
  }

}
