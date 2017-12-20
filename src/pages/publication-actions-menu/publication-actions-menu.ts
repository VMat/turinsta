import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {StorageProvider} from "../../providers/storage/storage";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the PublicationActionsMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publication-actions-menu',
  templateUrl: 'publication-actions-menu.html',
})
export class PublicationActionsMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private storageService: StorageProvider, private commons: CommonsProvider) {}
  followedPublication: boolean = null;
  followedUser: boolean = null;
  publication: string = null;
  user: string = null;

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicationActionsMenuPage');
    this.followedPublication = this.navParams.get("followedPublication");
    this.followedUser = this.navParams.get("followedUser");
    this.publication = this.navParams.get("publication");
    this.user = this.navParams.get("user");
  }

  handleFavorite(){
    if(!this.followedPublication){
      this.storageService.addPublicationFollower({publication: this.publication, user: this.commons.getUserId()}).subscribe((favoriteAdded)=>{
        this.commons.presentToast("Se ha guardado la publicación en favoritos con éxito");
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storageService.removePublicationFollower(this.commons.getUserId(),this.publication).subscribe((favoriteRemoved)=>{
        this.commons.presentToast("Se ha quitado la publicación de favoritos con éxito");
        this.viewCtrl.dismiss();
      });
    }
  }

  handleUser(){
    if(!this.followedUser){
      this.storageService.addFollower({followed: this.user, follower: this.commons.getUserId()}).subscribe((followerAdded)=>{
        this.commons.presentToast("Se ha empezado a seguir al usuario con éxito");
        this.viewCtrl.dismiss();
      })
    }
    else{
      this.storageService.removeFollower(this.user, this.commons.getUserId()).subscribe((followedRemoved)=>{
        this.commons.presentToast("Se ha dejado de seguir al usuario con éxito");
        this.viewCtrl.dismiss();
      })
    }
  }

  locatePlace(){
    alert("Ubicando destino en mapa...");
  }

  sharePublication(){
    alert("Compartiendo publicación...");
  }

  viewUser(){
    alert("Ver usuario");
    this.viewCtrl.dismiss();
  }

  denunciate(){
    alert("Publicación denunciada");
    this.viewCtrl.dismiss();
  }

}
