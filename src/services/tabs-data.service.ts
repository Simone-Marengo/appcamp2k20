import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class PageDataService {
  public listArray: Array<any> = [];
  public indexElementToUpdate: number;
  constructor(private toastController: ToastController) {}

  public addElement(element: any) {
    this.listArray.push(element);
  }

  public deleteElement(index: number) {
    // il metodo splice elimina un certo numero di elementi partendo dall'index dato
    this.listArray.splice(index, 1);
  }

  public getElementByIndexElementToUpdate(): any {
    return this.listArray[this.indexElementToUpdate];
  }

  public resetIndexElementToUpdate(): any {
    this.indexElementToUpdate = null;
  }

  public editElement(element: any) {
    // sostituire l'elemento
    this.listArray[this.indexElementToUpdate] = element;

    // eliminare e sostituire
    // this.listArray.splice(this.indexElementToUpdate, 1, element);

    // riassegniamo i valori
    // const { title, description, label, startDate, endDate } = element;
    // const arrayElement = this.listArray[this.indexElementToUpdate];

    // arrayElement.title = title;
    // arrayElement.description = description;
    // arrayElement.label = label;
    // arrayElement.startDate = startDate;
    // arrayElement.endDate = endDate;
  }

  public async presentToast(title: string) {
    const toast = await this.toastController.create({
      header: title,
      position: "bottom",
      duration: 2000
    });
    toast.present();
  }
}
