import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { IdentitiesComponent } from './identities/identities.component';
import { NewidentityComponent } from './newidentity/newidentity.component';
import { IdentityComponent } from './identity/identity.component';
import { KeysComponent } from './keys/keys.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    IdentitiesComponent,
    NewidentityComponent,
    IdentityComponent,
    KeysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
