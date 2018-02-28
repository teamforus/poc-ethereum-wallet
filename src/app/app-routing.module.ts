import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { IdentitykeysComponent } from './identitykeys/identitykeys.component';
import { KeysComponent } from './keys/keys.component';
import { NewkeyComponent } from './newkey/newkey.component';
import { ImportkeyComponent } from './importkey/importkey.component';

const routes: Routes = [
  { path: '', redirectTo: '/identities', pathMatch: 'full' },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'identities/new', component: NewidentityComponent },
  { path: 'identities/:address/keys', component: IdentitykeysComponent },
  { path: 'identities/:address', component: IdentityComponent },
  { path: 'keys', component: KeysComponent },
  { path: 'keys/new', component: NewkeyComponent }
  { path: 'keys/import', component: ImportkeyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
