var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import ImgCache from 'imgcache.js';
import { DomSanitizer } from "@angular/platform-browser";
/**
 * This service is charged of provide the methods to cache the images
 */
export var ImgcacheService = (function () {
    function ImgcacheService(platform, sanitizer) {
        this.sanitizer = sanitizer;
        this.imgQueue = [];
        ImgCache.options.debug = true;
    }
    /**
     * Init imgCache library
     * @return {Promise}
     */
    ImgcacheService.prototype.initImgCache = function () {
        return new Promise(function (resolve, reject) {
            if (ImgCache.ready) {
                resolve();
            }
            else {
                ImgCache.init(function () { return resolve(); }, function () { return reject(); });
            }
        });
    };
    ImgcacheService.prototype.getCachedFile = function (src) {
        return new Promise(function (resolve, reject) {
            ImgCache.getCachedFile(src, function (img_src, file) {
                if (Boolean(file)) {
                    resolve(file);
                }
                else {
                    resolve(img_src);
                }
            });
        });
    };
    ImgcacheService.prototype.getCachedFileUrl = function (src) {
        return new Promise(function (resolve, reject) {
            ImgCache.getCachedFileURL(src, function (originalUrl, cacheUrl) {
                resolve(cacheUrl);
            }, function (e) {
                reject(e);
            });
        });
    };
    /**
     * Cache images
     * @param src {string} - img source
     */
    ImgcacheService.prototype.cacheImg = function (src) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            ImgCache.isCached(src, function (path, success) {
                // if not, it will be cached
                if (success) {
                    ImgCache.getCachedFileURL(src, function (originalUrl, cacheUrl) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(cacheUrl));
                    }, function (e) {
                        reject(e);
                    });
                }
                else {
                    // cache img
                    ImgCache.cacheFile(src, function (cacheUrl) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(cacheUrl));
                    }, function (src) {
                        resolve(_this.sanitizer.bypassSecurityTrustUrl(src));
                    });
                }
            });
        });
    };
    ImgcacheService.prototype.useCachedFile = function (target) {
        return new Promise(function (resolve, reject) {
            ImgCache.useCachedFile(target, function (element) {
                resolve(element);
            }, function (element) {
                reject(element);
            });
        });
    };
    ImgcacheService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Platform, DomSanitizer])
    ], ImgcacheService);
    return ImgcacheService;
}());
//# sourceMappingURL=imgcache.js.map