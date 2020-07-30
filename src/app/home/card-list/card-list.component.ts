import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActionSheetController, ModalController, AlertController } from "@ionic/angular";
import { InsertPageComponent } from "../../insert/insert.component";
import { PageDataService } from "../../../services/tabs-data.service";
import { InsertActivityComponent } from "../../insert-activity/insert-activity.component";

@Component({
  selector: "app-card-list",
  templateUrl: "./card-list.component.html",
  styleUrls: ["./card-list.component.css", "../home.component.css"]
})
export class CardListComponent implements OnInit {

  @Input("list") list: any;
  @Input("index") index: any;

  @Output("emitRefreshArray") emitRefreshArray = new EventEmitter();

  constructor(
    private actionSheetController: ActionSheetController,
    private pageDataService: PageDataService,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Manage list",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.askForDelete();
          }
        },
        {
          text: "Edit",
          icon: "pencil",
          handler: () => {
            this.edit();
          }
        },
        {
          text: "Add activities",
          icon: "add",
          handler: () => {
            this.addActivities();
          }
        },
        {
          text: "Cancel",
          icon: "close",
          role: "cancel",
          handler: () => { }
        }
      ]
    });
    await actionSheet.present();
  }

  delete() {
    this.pageDataService.deleteElement(this.index);
    this.pageDataService.presentToast("Lista Eliminata con Successo!");
    this.emitRefreshArray.emit();
  }

  private async askForDelete() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure to <strong>delete</strong> this?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { }
        },
        {
          text: 'Okay',
          handler: () => {
            this.delete();
          }
        }
      ]
    });

    await alert.present();
  }

  async edit() {
    this.openInsert();
  }

  private async openInsert() {
    const modal = await this.modalController.create({
      component: InsertPageComponent,
      componentProps: {
        index: this.index
      }
    });

    return await modal.present();
  }

  addActivities() {
    this.openInsertActivities();
  }

  private async openInsertActivities() {
    const modal = await this.modalController.create({
      component: InsertActivityComponent,
      componentProps: {
        index: this.index
      }
    });

    return await modal.present();
  }

  async openViewAllActivities() {
    const modal = await this.modalController.create({
      component: InsertActivityComponent,
      componentProps: {
        index: this.index,
        viewOnly: true
      }
    });

    return await modal.present();
  }
}
