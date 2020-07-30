import { Component, OnInit } from "@angular/core";
import { PageDataService } from "../../services/tabs-data.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-insert-activity",
  templateUrl: "insert-activity.component.html",
  styleUrls: ["insert-activity.component.css"]
})
export class InsertActivityComponent implements OnInit {
  listArray: Array<any> = [];
  isModalOpened: boolean = false;
  constructor(
    private modalController: ModalController,
    private pageDataService: PageDataService
  ) {}

  ngOnInit() {
    this.listArray = this.pageDataService.listArray;
    this.checkIsModalOpened();
  }

  saveActivity(activityInput, i) {
    this.listArray[i].listActivity.push(activityInput.value);
    activityInput.value = "";
  }

  deleteActivity(indexActivity, indexList) {
    this.listArray[indexList].listActivity.splice(indexActivity, 1);
  }
  disableInput(value: string): boolean {
    return value === "" ? true : false;
  }

  async checkIsModalOpened() {
    await this.modalController
      .getTop()
      .then(item => (this.isModalOpened = item ? true : false));
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  getHeaderTitle = () => "Activities";
}
