import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { ComptesComponent } from 'src/app/components/comptes/comptes.component';
import { AppComponent } from './app.component';
import { CreateCompteExistingComponent } from './components/create-compte-existing/create-compte-existing.component';
import { CreateCompteNewComponent } from './components/create-compte-new/create-compte-new.component';
import { EditCompteComponent } from './components/edit-compte/edit-compte.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { IndexComponent } from './components/index/index.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent }, 
  { path: 'clients', component: ClientsComponent },
  { path: 'clients/create', component: ClientFormComponent },
  { path: 'clients/edit/:cin', component: ClientFormComponent },
  { path: 'comptes', component: ComptesComponent },
  { path: 'comptes/create/existing', component: CreateCompteExistingComponent },
  { path: 'comptes/create/new', component: CreateCompteNewComponent },
  { path: 'comptes/edit/:rib', component: EditCompteComponent },
  { path: '', redirectTo: 'index', pathMatch: 'full' }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
