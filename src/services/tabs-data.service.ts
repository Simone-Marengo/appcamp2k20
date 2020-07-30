import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class PageDataService {
  public listArray: Array<any> = [];
  constructor(private toastController: ToastController) { }

  public addElement(element: any) {
    this.listArray.push(element);
  }

  public deleteElement(index: number) {
    // il metodo splice elimina un certo numero di elementi partendo dall'index dato
    this.listArray.splice(index, 1);
  }

  public getElementByIndexElementToUpdate(index): any {
    return this.listArray[index];
  }

  public editElement(element: any, index) {
    // sostituire l'elemento
    this.listArray[index] = element;

    // eliminare e sostituire
    // this.listArray.splice(this.indexElementToUpdate, 1, element);
  }

  public async presentToast(title: string) {
    const toast = await this.toastController.create({
      header: title,
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
}
