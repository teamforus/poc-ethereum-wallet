import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtokenComponent } from '@app/addtoken/addtoken.component';
import { AddVoucherComponent } from '@app/voucher/add/addvoucher.component';
import { CurrenciesComponent } from '@app/currencies/currencies.component';
import { DeleterecordComponent } from '@app/deleterecord/deleterecord.component';
import { IdentitiesComponent } from '@app/identities/identities.component';
import { IdentityComponent } from '@app/identity/identity.component';
import { IdentityaddkeyComponent } from '@app/identityaddkey/identityaddkey.component';
import { ImportkeyComponent } from '@app/importkey/importkey.component';
import { IssueClaimComponent } from '@app/issue-claim/issue-claim.component';
import { KeysComponent } from '@app/keys/keys.component';
import { NewidentityComponent } from '@app/newidentity/newidentity.component';
import { NewkeyComponent } from '@app/newkey/newkey.component';
import { ResetComponent } from '@app/reset/reset.component';
import { SetrecordComponent } from '@app/setrecord/setrecord.component';
import { TransferFromIdentityComponent } from '@app/transfer-from-identity/transfer-from-identity.component';
import { TransferFromKeyComponent } from '@app/transfer-from-key/transfer-from-key.component';
import { TransferTokenFromIdentityComponent } from '@app/transfer-token-from-identity/transfer-token-from-identity.component';
import { TransferTokenFromKeyComponent } from '@app/transfer-token-from-key/transfer-token-from-key.component';
import { VoucherListComponent } from '@app/voucher/list/voucherlist.component';
import { CreateVoucherComponent } from '@app/voucher/create/createvoucher.component';
import { RedeemVoucherComponent } from '@app/voucher/redeem/redeemvoucher.component';


const routes: Routes = [
  { path: '', redirectTo: '/identities', pathMatch: 'full' },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'identities/new', component: NewidentityComponent },
  { path: 'identities/:address/newkey', component: IdentityaddkeyComponent },
  { path: 'identities/:address/issueclaim', component: IssueClaimComponent },
  { path: 'identities/:address', component: IdentityComponent },
  { path: 'identities/:address/transfer', component: TransferFromIdentityComponent },
  { path: 'identities/:address/transfertoken/:tokenaddress', component: TransferTokenFromIdentityComponent },
  { path: 'identities/:address/record/:record/delete', component: DeleterecordComponent },
  { path: 'identities/:address/record/:record', component: SetrecordComponent },
  { path: 'identities/:address/record', component: SetrecordComponent },
  { path: 'keys', component: KeysComponent },
  { path: 'keys/:address/transfer', component: TransferFromKeyComponent },
  { path: 'keys/new', component: NewkeyComponent },
  { path: 'keys/import', component: ImportkeyComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'currencies/addtoken', component: AddtokenComponent },
  { path: 'vouchers', component: VoucherListComponent },
  { path: 'voucher/add', component: AddVoucherComponent },
  { path: 'voucher/create/:tokenAddress/:sponsorAddress', component: CreateVoucherComponent },
  { path: 'voucher/:tokenAddress/:sponsorAddress/redeem/:address', component: RedeemVoucherComponent },
  { path: 'keys/:address/transfertoken/:tokenaddress', component: TransferTokenFromKeyComponent },
  { path: 'reset', component: ResetComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
