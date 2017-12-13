import {Component, Input} from '@angular/core';
import {ImgcacheService} from "../../providers/imgcache/imgcache";

/**
 * Generated class for the PublicationImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'publication-image',
  templateUrl: 'publication-image.html'
})
export class PublicationImageComponent {

  @Input() id: any = null;
  @Input() url: any = null;
  cachedImage: string = null;

  constructor(private imgCacheService:ImgcacheService) {
    console.log('Hello PublicationImageComponent Component');
  }

  ngOnInit(){
    this.imgCacheService.cacheImg(this.url).then((cachedImage)=>{
      this.cachedImage = cachedImage;
    })
  }

  setCachedImage(){
    this.url = this.cachedImage;
  }
}
