import { ClaimsService } from './claims/claims.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { AppComponent } from './app.component';
import { IdentitiesComponent } from './screens/identities/identities.component';
import { NewidentityComponent } from './screens/newidentity/newidentity.component';
import { IdentityComponent } from './screens/identity/identity.component';
import { KeysComponent } from './screens/keys/keys.component';
import { AppRoutingModule } from './/app-routing.module';
import { VaultService } from './vault/vault.service';
import { FormsModule } from '@angular/forms';
import { Web3Service } from './web3/web3.service';
import { IdentityaddkeyComponent } from './screens/identityaddkey/identityaddkey.component';
import { ImportkeyComponent } from './screens/importkey/importkey.component';
import { NewkeyComponent } from './screens/newkey/newkey.component';
import { TransferFromKeyComponent } from './screens/transfer-from-key/transfer-from-key.component';
import { IssueClaimComponent } from './screens/issue-claim/issue-claim.component';
import { EventParamsPipe } from './pipes/event-params.pipe';
import { CurrenciesComponent } from './screens/currencies/currencies.component';
import { TransferFromIdentityComponent } from './screens/transfer-from-identity/transfer-from-identity.component';
import { AddtokenComponent } from './screens/addtoken/addtoken.component';
import { TransferTokenFromKeyComponent } from './screens/transfer-token-from-key/transfer-token-from-key.component';
import { TransferTokenFromIdentityComponent } from './screens/transfer-token-from-identity/transfer-token-from-identity.component';
import { ResetComponent } from './screens/reset/reset.component';
import { FromWeiPipe } from './pipes/from-wei.pipe';
import { OnsenModule } from 'ngx-onsenui';
import { KeysPageNavComponent } from './screens/keys-page-nav/keys-page-nav.component';
import { CurrenciesPageNavComponent } from './screens/currencies-page-nav/currencies-page-nav.component';
import { IdentitiesPageNavComponent } from './screens/identities-page-nav/identities-page-nav.component';
import { ScannerService } from './scanner/scanner.service';
import { LoginComponent } from './screens/login/login.component';
import { SettingsComponent } from './screens/settings/settings.component';
import { TransactionComponent } from './screens/transaction/transaction.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ImportidentityComponent } from './screens/importidentity/importidentity.component';
import { IdentityimportkeyComponent } from './screens/identityimportkey/identityimportkey.component';
import { KeyComponent } from './screens/key/key.component';
import { TransferAllowanceFromIdentityComponent } from './screens/transfer-allowance-from-identity/transfer-allowance-from-identity.component';
import { ClaimComponent } from './screens/claim/claim.component';
import { ClaimTopicPipe } from './pipes/claim-topic.pipe';
import { ClaimIssuerPipe } from './pipes/claim-issuer.pipe';
import { HexToUtf8Pipe } from './pipes/hex-to-utf8.pipe';


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
    ResetComponent,
    FromWeiPipe,
    KeysPageNavComponent,
    CurrenciesPageNavComponent,
    IdentitiesPageNavComponent,
    LoginComponent,
    SettingsComponent,
    TransactionComponent,
    ImportidentityComponent,
    IdentityimportkeyComponent,
    KeyComponent,
    TransferAllowanceFromIdentityComponent,
    ClaimComponent,
    ClaimTopicPipe,
    ClaimIssuerPipe,
    HexToUtf8Pipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OnsenModule,
    QRCodeModule
  ],
  providers: [VaultService, Web3Service, ScannerService, ClaimsService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [
    KeysPageNavComponent,
    CurrenciesPageNavComponent,
    IdentitiesPageNavComponent,
    LoginComponent,
    SettingsComponent,
    TransactionComponent,
    ImportidentityComponent,
    IdentityimportkeyComponent,
    KeyComponent,
    TransferAllowanceFromIdentityComponent,
    ClaimComponent
  ]
})
export class AppModule { }
