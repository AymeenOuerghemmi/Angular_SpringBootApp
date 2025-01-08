import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComptesComponent } from './components/comptes/comptes.component';
import { ClientsComponent } from './components/clients/clients.component';
import { CreateCompteExistingComponent } from './components/create-compte-existing/create-compte-existing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCompteNewComponent } from './components/create-compte-new/create-compte-new.component';
import { EditCompteComponent } from './components/edit-compte/edit-compte.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { IndexComponent } from './components/index/index.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ComptesComponent,
    ClientsComponent,
    CreateCompteExistingComponent,
    CreateCompteNewComponent,
    EditCompteComponent,
    ClientFormComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
