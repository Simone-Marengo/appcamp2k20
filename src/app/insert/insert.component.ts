import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { PageDataService } from "../../services/tabs-data.service";
import { ToastController, ModalController } from "@ionic/angular";
import { aliasTransformFactory } from "@angular/compiler-cli/src/ngtsc/transform/src/alias";

@Component({
  selector: "app-insert",
  templateUrl: "insert.component.html",
  styleUrls: ["insert.component.css"]
})
export class InsertPageComponent implements OnInit, OnDestroy {
  minStartDate: string;
  listIndexNumber: number;
  action: string = "Save";
  element: any;

  // contenitore di input ( serve a prelevare e controllare valori)
  form: FormGroup;
  constructor(
    private pageDataService: PageDataService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
    private modalController: ModalController
  ) {
    this.form = this.createForm(formBuilder);
  }

  ngOnInit() {
    const index = this.pageDataService.indexElementToUpdate;
    this.setMinStartDates();
    if (index !== null && index !== undefined) {
      this.element = this.pageDataService.getElementByIndexElementToUpdate();
      if (this.element) {
        this.action = "Edit";
        this.valorizeForm(this.element);
      }
    }
  }

  setMinStartDates() {
    const today: string = new Date().toISOString();
    this.minStartDate = today;
  }

  onChangeStartDate() {
    this.resetEndDateValue();
    const startDate = this.form.get("startDate");
    const endDate = this.form.get("endDate");
    
    if (
      (startDate.dirty && startDate.touched) ||
      (startDate.value && startDate.value !== null)
    ) {
      endDate.enable();
    } else {
      if (!endDate.disabled) endDate.disable();
    }
  }

  resetEndDateValue() {
    this.form.get("endDate").reset();
  }

  private valorizeForm(element) {
    const { title, description, label, startDate, endDate, imageUrl } = element;
    this.form.patchValue({
      title,
      description,
      label,
      startDate,
      endDate,
      imageUrl
    });
  }

  saveLista() {
    const listValue: any = this.getListValue();
    this.pageDataService.addElement(listValue);
    this.pageDataService.presentToast("Lista Salvata con Successo!");
    this.form.reset();
  }

  editLista() {
    const listValue: any = this.getListValue();
    this.pageDataService.editElement(listValue);
    this.pageDataService.presentToast("Lista Modificata con Successo!");
    this.form.reset();
    this.dismiss();
  }

  getListValue(): any {
    const titleValue = this.form.get("title").value;
    const descriptionValue = this.form.get("description").value;
    const labelValue = this.form.get("label").value;
    const startDateValue = this.form.get("startDate").value;
    const endDateValue = this.form.get("endDate").value;
    const imageUrlValue = this.form.get("imageUrl").value;
    const className = this.getListClassByLabel(labelValue);
    const lista: any = {
      title: titleValue,
      description: descriptionValue,
      label: labelValue,
      startDate: startDateValue,
      endDate: endDateValue,
      imageUrl: imageUrlValue,
      listActivity: this.action === "Edit" ? this.element.listActivity : [],
      className
    };
    return lista;
  }

  createForm(formBuilder) {
    return formBuilder.group({
      title: [
        "",
        [Validators.minLength(3), Validators.maxLength(25), Validators.required]
      ],
      description: [
        "",
        [Validators.minLength(3), Validators.maxLength(50), Validators.required]
      ],
      label: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: [{ value: "", disabled: true }, Validators.required],
      imageUrl: ["", Validators.required]
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  // getHeaderTitle() {
  //   return `${this.action} List`;
  // }

  getHeaderTitle = () => `${this.action} List`; // this.action + "List"

  getListClassByLabel(labelValue: string): string {
    let className: string;
    className = "label-card-" + labelValue;
    return className;
  }

  // getListClassByLabel = (
  //   labelValue: string = "personal" || "work" || "school"
  // ) => `label-card-${labelValue}`;

  ngOnDestroy() {
    this.element = null;
  }
}
