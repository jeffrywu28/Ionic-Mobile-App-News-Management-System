import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddberitaPage } from './addberita.page';

const routes: Routes = [
  {
    path: '',
    component: AddberitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddberitaPageRoutingModule {}
