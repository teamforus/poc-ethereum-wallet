import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentitiesComponent } from './screens/identities/identities.component';
import { NewidentityComponent } from './screens/newidentity/newidentity.component';
import { IdentityComponent } from './screens/identity/identity.component';
import { IdentityaddkeyComponent } from './screens/identityaddkey/identityaddkey.component';
import { KeysComponent } from './screens/keys/keys.component';
import { NewkeyComponent } from './screens/newkey/newkey.component';
import { ImportkeyComponent } from './screens/importkey/importkey.component';
import { TransferFromKeyComponent } from './screens/transfer-from-key/transfer-from-key.component';
import { IssueClaimComponent } from './screens/issue-claim/issue-claim.component';
import { CurrenciesComponent } from './screens/currencies/currencies.component';
import { TransferFromIdentityComponent } from './screens/transfer-from-identity/transfer-from-identity.component';
import { AddtokenComponent } from './screens/addtoken/addtoken.component';
import { TransferTokenFromKeyComponent } from './screens/transfer-token-from-key/transfer-token-from-key.component';
import { TransferTokenFromIdentityComponent } from './screens/transfer-token-from-identity/transfer-token-from-identity.component';
import { ResetComponent } from './screens/reset/reset.component';

const routes: Routes = [
  // { path: '', redirectTo: '/identities', pathMatch: 'full' },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'identities/new', component: NewidentityComponent },
  { path: 'identities/:address/newkey', component: IdentityaddkeyComponent },
  { path: 'identities/:address/issueclaim', component: IssueClaimComponent },
  { path: 'identities/:address', component: IdentityComponent },
  { path: 'identities/:address/transfer', component: TransferFromIdentityComponent },
  { path: 'identities/:address/transfertoken/:tokenaddress', component: TransferTokenFromIdentityComponent },
  { path: 'keys', component: KeysComponent },
  { path: 'keys/:address/transfer', component: TransferFromKeyComponent },
  { path: 'keys/new', component: NewkeyComponent },
  { path: 'keys/import', component: ImportkeyComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'currencies/addtoken', component: AddtokenComponent },
  { path: 'keys/:address/transfertoken/:tokenaddress', component: TransferTokenFromKeyComponent },
  { path: 'reset', component: ResetComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
