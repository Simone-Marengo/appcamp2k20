import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsertPageComponent } from './insert.component';

const routes: Routes = [
  {
    path: '',
    component: InsertPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InsertRoutingModule {}