import {Component, Input} from '@angular/core';
import {StorageProvider} from "../../providers/storage/storage";
import {AlertController, ModalController} from "ionic-angular";
import {CommonsProvider} from "../../providers/commons/commons";
import {ExperienceWritingPage} from "../../pages/experience-writing/experience-writing";

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

  constructor(private storage: StorageProvider, private alertCtrl: AlertController, private commonsService: CommonsProvider, private modalCtrl: ModalController) {
    console.log('Hello ExperienceComponent Component');
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

  presentExperienceWritingModal(){
    let experienceWritingModal = this.modalCtrl.create(ExperienceWritingPage,{experience: this.data});
    experienceWritingModal.present();
    experienceWritingModal.onDidDismiss((experience)=>{
      if(experience){
        this.data = experience;
      }
    })
  }

  removeExperience(){
    this.storage.deleteExperience(this.data).subscribe((deletedExperience)=>{
      this.commonsService.presentToast(this.commonsService.translate(["experienceDeleteSuccess"]));
    });
  }

  checkEditionPermission(){
    return this.publicationOwner == this.commonsService.getUserId() || !this.publicationOwner;
  }

}
