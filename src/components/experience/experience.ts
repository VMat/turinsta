import {Component, Input} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {AlertController} from "ionic-angular";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the ExperienceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'experience',
  templateUrl: 'experience.html'
})
export class ExperienceComponent {

  @Input() data: any = null;
  @Input() publicationOwner: any = null;
  editionMode: boolean = false;
  categoryInput: string = null;
  contentInput: string = null;

  constructor(private storage: StorageProvider, private alertCtrl: AlertController, private commonsService: CommonsProvider) {
    console.log('Hello ExperienceComponent Component');
  }

  toogleEditionMode(){
    this.editionMode = !this.editionMode;
    this.categoryInput = this.editionMode ? this.data.category : null;
    this.contentInput = this.editionMode ? this.data.content : null;
  }

  confirmUpdate() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea editar la experiencia?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.updateExperience();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  confirmDelete(){
    let confirm = this.alertCtrl.create({
      title: 'Confirmar operación',
      message: '¿Está seguro que desea borrar la experiencia?',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            this.removeExperience();
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }

  updateExperience(){
    this.storage.updateExperience(this.data).subscribe((updatedExperience)=>{
      this.commonsService.presentToast("Experiencia editada con éxito");
      this.toogleEditionMode();
    });
  }

  removeExperience(){
    this.storage.deleteExperience(this.data).subscribe((deletedExperience)=>{
      this.commonsService.presentToast("Experiencia borrada con éxito");
    });
  }

  checkEditionPermission(){
    return this.publicationOwner == this.commonsService.getUserId();
  }

  checkDeletePermission(){
    let loggedUser = this.commonsService.getUserId();
    return (this.publicationOwner == loggedUser) || (this.publicationOwner == loggedUser);
  }

}
