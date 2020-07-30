import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";

import { InsertPageComponent } from "./insert.component";
import { InsertRoutingModule } from "./insert-routing.module";
import { HeaderModalDismisserModule } from "../components/header-modal-dismisser/header-modal-dismisser.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InsertRoutingModule,
    HeaderModalDismisserModule
  ],
  declarations: [InsertPageComponent],
  exports: [InsertPageComponent],
  entryComponents: [InsertPageComponent]
})
export class InsertPageModule {}
