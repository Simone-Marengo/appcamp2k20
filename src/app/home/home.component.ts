import { Component } from "@angular/core";
import { PageDataService } from "../../services/tabs-data.service";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { InsertPageComponent } from "../insert/insert.component";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["home.component.css"]
})
export class HomeComponent {
  listArray: Array<any> = [];

  constructor(
    private pageDataService: PageDataService
  ) {
    this.refreshArray();
  }

  refreshArray() {
    this.listArray = this.pageDataService.listArray;
  }

  imageUrlOops =
    "https://previews.123rf.com/images/gorkemdemir/gorkemdemir1409/gorkemdemir140901206/31675881-oops-red-rubber-stamp-over-a-white-background-.jpg";
}
