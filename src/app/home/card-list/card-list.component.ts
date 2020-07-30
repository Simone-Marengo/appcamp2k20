import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
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
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: "Manage list",
      // cssClass: "my-custom-class",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          icon: "trash",
          handler: () => {
            this.delete();
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
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    await actionSheet.present();
  }

  /*
    per eliminare un elemento
      - metodo collegato al bottone di delete nell'html
      - nel metodo richimare, passando l'index attuale dell'elemento da eliminare,
        al metodo di eliminazione nel service
      - infine aggiornare l'array con quello modificato nel service
  */
  delete() {
    this.pageDataService.deleteElement(this.index);
    this.pageDataService.presentToast("Lista Eliminata con Successo!");
    this.emitRefreshArray.emit();
  }

  async edit() {
    this.openInsert();
  }

  private async openInsert() {
    this.pageDataService.indexElementToUpdate = this.index;
    const modal = await this.modalController.create({
      component: InsertPageComponent
      // componentProps: {
      //   listIndexNumber: index
      // }
    });

    modal.onDidDismiss().then((detail: any) => {
      this.pageDataService.resetIndexElementToUpdate();
    });

    return await modal.present();
  }

  addActivities() {
    this.openInsertActivities();
  }

  private async openInsertActivities() {
    this.pageDataService.indexElementToUpdate = this.index;
    const modal = await this.modalController.create({
      component: InsertActivityComponent
      // componentProps: {
      //   listIndexNumber: index
      // }
    });

    modal.onDidDismiss().then((detail: any) => {
      this.pageDataService.resetIndexElementToUpdate();
    });

    return await modal.present();
  }
}
