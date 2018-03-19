import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { IdentityaddkeyComponent } from './identityaddkey/identityaddkey.component';
import { KeysComponent } from './keys/keys.component';
import { NewkeyComponent } from './newkey/newkey.component';
import { ImportkeyComponent } from './importkey/importkey.component';
import { TransferFromKeyComponent } from './transfer-from-key/transfer-from-key.component';

const routes: Routes = [
  { path: '', redirectTo: '/identities', pathMatch: 'full' },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'identities/new', component: NewidentityComponent },
  { path: 'identities/:address/newkey', component: IdentityaddkeyComponent },
  { path: 'identities/:address', component: IdentityComponent },
  { path: 'keys', component: KeysComponent },
  { path: 'keys/:address/transfer', component: TransferFromKeyComponent },
  { path: 'keys/new', component: NewkeyComponent },
  { path: 'keys/import', component: ImportkeyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
