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
import { TransferFromKeyComponent } from './transfer-from-key/transfer-from-key.component';
import { IssueClaimComponent } from './issue-claim/issue-claim.component';
import { EventParamsPipe } from './pipes/event-params.pipe';
import { CurrenciesComponent } from './currencies/currencies.component';
import { TransferFromIdentityComponent } from './transfer-from-identity/transfer-from-identity.component';
import { AddtokenComponent } from './addtoken/addtoken.component';
import { TransferTokenFromKeyComponent } from './transfer-token-from-key/transfer-token-from-key.component';
import { TransferTokenFromIdentityComponent } from './transfer-token-from-identity/transfer-token-from-identity.component';
import { SetrecordComponent } from './setrecord/setrecord.component';
import { DeleterecordComponent } from './deleterecord/deleterecord.component';
import { ResetComponent } from './reset/reset.component';
import { FromWeiPipe } from './pipes/from-wei.pipe';
import { RequestrecordComponent } from './requestrecord/requestrecord.component';


@NgModule({
  declarations: [
    AppComponent,
    IdentitiesComponent,
    NewidentityComponent,
    IdentityComponent,
    KeysComponent,
    IdentityaddkeyComponent,
    ImportkeyComponent,
    NewkeyComponent,
    TransferFromKeyComponent,
    IssueClaimComponent,
    EventParamsPipe,
    CurrenciesComponent,
    TransferFromIdentityComponent,
    AddtokenComponent,
    TransferTokenFromKeyComponent,
    TransferTokenFromIdentityComponent,
    SetrecordComponent,
    DeleterecordComponent,
    ResetComponent,
    FromWeiPipe,
    RequestrecordComponent
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
