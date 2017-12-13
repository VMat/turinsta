import { Injectable } from '@angular/core';
import { Platform }   from 'ionic-angular';
import ImgCache       from 'imgcache.js';
import {elementAt} from "rxjs/operator/elementAt";
import {DomSanitizer} from "@angular/platform-browser";
/**
 * This service is charged of provide the methods to cache the images
 */
@Injectable()
export class ImgcacheService {
  public imgQueue: string[] = [];
  constructor(platform: Platform, private sanitizer: DomSanitizer) {
    ImgCache.options.debug = true;
  }
  /**
   * Init imgCache library
   * @return {Promise}
   */
  public initImgCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (ImgCache.ready) {
        resolve();
      } else {
        ImgCache.init(() => resolve(), () => reject());
      }
    });
  }

  public getCachedFile(src){
    return new Promise((resolve, reject) => {
      ImgCache.getCachedFile(src,(img_src,file)=>{
        if(Boolean(file)){
          resolve(file)
        }
        else{
          resolve(img_src);
        }
      })
    })
  }

  public getCachedFileUrl(src) {
    return new Promise((resolve, reject) => {
      ImgCache.getCachedFileURL(src,
        (originalUrl, cacheUrl) => {
          resolve(cacheUrl);
        },
        (e) => {
          reject(e)
        })
    })
  }
  /**
   * Cache images
   * @param src {string} - img source
   */
  public cacheImg(src: string): Promise<any> {
    return new Promise((resolve, reject) => {
      ImgCache.isCached(src, (path: string, success: boolean) => {
        // if not, it will be cached
        if (success) {
          ImgCache.getCachedFileURL(src,
            (originalUrl, cacheUrl) => {
              resolve(this.sanitizer.bypassSecurityTrustUrl(cacheUrl));
            },
            (e) => {
              reject(e)
            });
        } else {
          // cache img
          ImgCache.cacheFile(src,(cacheUrl)=>{
            resolve(this.sanitizer.bypassSecurityTrustUrl(cacheUrl))
          },
          (src)=>{
            resolve(this.sanitizer.bypassSecurityTrustUrl(src));
          });
          // return original img URL
        }
      });
    });
  }

  public useCachedFile(target){
    return new Promise((resolve,reject)=>{
      ImgCache.useCachedFile(target,(element)=>{
        resolve(element);
      },
      (element)=>{
        reject(element);
      })
    })
  }
}
