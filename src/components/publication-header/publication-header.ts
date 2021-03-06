import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ImgcacheService} from "../../providers/imgcache/imgcache";
import {ModalController} from "ionic-angular";
import {PlaceSelectingPage} from "../../pages/place-selecting/place-selecting";
import {CommonsProvider} from "../../providers/commons/commons";

/**
 * Generated class for the PublicationHeaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-header',
  templateUrl: 'publication-header.html'
})
export class PublicationHeaderComponent {

  @Input() user: any = null;
  @Input() publication: any = null;
  @Input() edit: boolean = false;
  @Output() changePlace = new EventEmitter<any>();
  cachedAvatar: string = null;

  constructor(private imgCacheService:ImgcacheService, private modalCtrl: ModalController, private commons: CommonsProvider){
    console.log('Hello PublicationHeaderComponent Component');
  }

  ngOnInit(){
    if(this.user._id){
      this.imgCacheService.cacheImg(this.user.avatar).then((cachedAvatar)=>{
        this.cachedAvatar = cachedAvatar;
      });
    }
  }

  getCachedAvatar(){
    return this.user.avatar = this.cachedAvatar;
  }

  presentPlaceUpdating(){
    let placeSelecting = this.modalCtrl.create(PlaceSelectingPage,{publicationId: this.publication._id});
    placeSelecting.present();
    placeSelecting.onDidDismiss((place)=>{
      if(place){
        this.changePlace.emit(place);
      }
    })
  }

  getCaption(captionKey){
    return this.commons.translate([captionKey]);
  }
}
