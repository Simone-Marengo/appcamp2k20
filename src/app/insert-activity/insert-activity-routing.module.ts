import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsertActivityComponent } from './insert-activity.component';

const routes: Routes = [
  {
    path: '',
    component: InsertActivityComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InsertActivityRoutingModule {}