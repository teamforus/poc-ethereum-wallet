import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { KeysComponent } from './keys/keys.component';
import { AppRoutingModule } from './/app-routing.module';
import { VaultService } from './vault/vault.service';
import { FormsModule } from '@angular/forms';
import { Web3Service } from './web3.service';
import { IdentityaddkeyComponent } from './identityaddkey/identityaddkey.component';
import { ImportkeyComponent } from './importkey/importkey.component';
import { NewkeyComponent } from './newkey/newkey.component';


@NgModule({
  declarations: [
    AppComponent,
    IdentitiesComponent,
    NewidentityComponent,
    IdentityComponent,
    KeysComponent,
    IdentityaddkeyComponent,
    ImportkeyComponent,
    NewkeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [VaultService, Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
