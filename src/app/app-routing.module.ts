import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { IdentityaddkeyComponent } from './identityaddkey/identityaddkey.component';
import { KeysComponent } from './keys/keys.component';
import { NewkeyComponent } from './newkey/newkey.component';
// import { ImportkeyComponent } from '@app/register/import-key/import-key.component';
import { TransferFromKeyComponent } from './transfer-from-key/transfer-from-key.component';
import { IssueClaimComponent } from './issue-claim/issue-claim.component';
import { CurrenciesComponent } from './currencies/currencies.component';
import { TransferFromIdentityComponent } from './transfer-from-identity/transfer-from-identity.component';
import { TransferTokenFromKeyComponent } from './transfer-token-from-key/transfer-token-from-key.component';
import { TransferTokenFromIdentityComponent } from './transfer-token-from-identity/transfer-token-from-identity.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  // { path: '', redirectTo: '/identities', pathMatch: 'full' },
  /* I don't believe any of this is needed anymore as of phonegap?
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
  // { path: 'keys/import', component: ImportkeyComponent },
  { path: 'currencies', component: CurrenciesComponent },
  { path: 'keys/:address/transfertoken/:tokenaddress', component: TransferTokenFromKeyComponent },
  { path: 'reset', component: ResetComponent }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
