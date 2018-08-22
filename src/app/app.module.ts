import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


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
import { ResetComponent } from './reset/reset.component';
import { FromWeiPipe } from './pipes/from-wei.pipe';
import { OnsenModule } from 'ngx-onsenui';
import { KeysPageNavComponent } from './keys-page-nav/keys-page-nav.component';
import { CurrenciesPageNavComponent } from './currencies-page-nav/currencies-page-nav.component';
import { IdentitiesPageNavComponent } from './identities-page-nav/identities-page-nav.component';
import { ScannerService } from './scanner.service';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { TransactionComponent } from './transaction/transaction.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ImportidentityComponent } from './importidentity/importidentity.component';
import { IdentityimportkeyComponent } from './identityimportkey/identityimportkey.component';
import { KeyComponent } from './key/key.component';
import { TransferAllowanceFromIdentityComponent } from './transfer-allowance-from-identity/transfer-allowance-from-identity.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '@app/register/welcome/welcome.component';
import { NewKeyComponent } from '@app/register/new-key/new-key.component';
import { NewIdentityComponent } from '@app/register/new-identity/new-identity.component';
import { KeySelecterComponent } from '@app/utils/key-selecter/key-selecter.component';


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
    HomeComponent,
    WelcomeComponent,
    NewKeyComponent,
    NewIdentityComponent,
    KeySelecterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    OnsenModule,
    QRCodeModule
  ],
  providers: [VaultService, Web3Service, ScannerService],
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
    HomeComponent,
    WelcomeComponent,
    NewKeyComponent,
    NewIdentityComponent
  ]
})
export class AppModule { }
