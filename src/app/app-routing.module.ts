import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { KeysComponent } from './keys/keys.component';

const routes: Routes = [
  { path: '', redirectTo: '/identities', pathMatch: 'full' },
  { path: 'identities', component: IdentitiesComponent },
  { path: 'identities/new', component: NewidentityComponent },
  { path: 'identities/:address/keys', component: KeysComponent },
  { path: 'identities/:address', component: IdentityComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
