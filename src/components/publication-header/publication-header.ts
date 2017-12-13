import {Component, Input} from '@angular/core';
import {ImgcacheService} from "../../providers/imgcache/imgcache";

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
  cachedAvatar: string = null;

  constructor(private imgCacheService:ImgcacheService){
    console.log('Hello PublicationHeaderComponent Component');
  }

  ngOnInit(){
    this.imgCacheService.cacheImg(this.user.avatar).then((cachedAvatar)=>{
      this.cachedAvatar = cachedAvatar;
    });
  }

  getCachedAvatar(){
    return this.user.avatar = this.cachedAvatar;
  }
}
