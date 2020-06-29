import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddberitaPageRoutingModule } from './addberita-routing.module';

import { AddberitaPage } from './addberita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddberitaPageRoutingModule
  ],
  declarations: [AddberitaPage]
})
export class AddberitaPageModule {}
