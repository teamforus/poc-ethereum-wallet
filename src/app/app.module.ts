import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './/app-routing.module';
import { AddtokenComponent } from './addtoken/addtoken.component';
import { AddVoucherComponent } from '@app/voucher/add/addvoucher.component';
import { AppComponent } from './app.component';
import { CreateVoucherComponent } from '@app/voucher/create/createvoucher.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { DeleterecordComponent } from './deleterecord/deleterecord.component';
import { IdentitiesComponent } from './identities/identities.component';
import { IdentityComponent } from './identity/identity.component';
import { IdentityaddkeyComponent } from './identityaddkey/identityaddkey.component';
import { ImportkeyComponent } from './importkey/importkey.component';
import { IssueClaimComponent } from './issue-claim/issue-claim.component';
import { KeysComponent } from './keys/keys.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { NewkeyComponent } from './newkey/newkey.component';
import { EventParamsPipe } from './pipes/event-params.pipe';
import { FromWeiPipe } from './pipes/from-wei.pipe';
import { RedeemVoucherComponent } from '@app/voucher/redeem/redeemvoucher.component';
import { ResetComponent } from './reset/reset.component';
import { SetrecordComponent } from './setrecord/setrecord.component';
import { TransferFromIdentityComponent } from './transfer-from-identity/transfer-from-identity.component';
import { TransferFromKeyComponent } from './transfer-from-key/transfer-from-key.component';
import { TransferTokenFromIdentityComponent } from './transfer-token-from-identity/transfer-token-from-identity.component';
import { TransferTokenFromKeyComponent } from './transfer-token-from-key/transfer-token-from-key.component';
import { VaultService } from './vault/vault.service';
import { VoucherListComponent } from '@app/voucher/list/voucherlist.component';
import { Web3Service } from './web3.service';

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
    VoucherListComponent,
    AddVoucherComponent,
    CreateVoucherComponent,
    RedeemVoucherComponent,
    SetrecordComponent,
    DeleterecordComponent,
    ResetComponent,
    FromWeiPipe
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
