import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-header-modal-dismisser",
  templateUrl: "header-modal-dismisser.component.html",
  styleUrls: ["header-modal-dismisser.component.css"]
})
export class HeaderModalDismisserComponent implements OnInit {
  isModalOpened: boolean = false;
  @Input('title') title: any;
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.checkIsModalOpened();
  }

  async checkIsModalOpened() {
    await this.modalController
      .getTop()
      .then(item => (this.isModalOpened = item ? true : false));
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
