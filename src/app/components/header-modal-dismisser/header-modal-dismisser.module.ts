import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { HeaderModalDismisserComponent } from "./header-modal-dismisser.component";

@NgModule({
  imports: [IonicModule, CommonModule, ], 
  declarations: [HeaderModalDismisserComponent],
  exports: [HeaderModalDismisserComponent]
})
export class HeaderModalDismisserModule {}
