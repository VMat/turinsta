var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Pipe } from '@angular/core';
/**
 * Generated class for the ContainsFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
export var ContainsFilterPipe = (function () {
    function ContainsFilterPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    ContainsFilterPipe.prototype.transform = function (items, filter) {
        if (!items || !filter["value"]) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(function (item) { return (item[filter["key"]]).toLowerCase().includes(filter["value"].toLowerCase()); });
    };
    ContainsFilterPipe = __decorate([
        Pipe({
            name: 'containsFilter',
        }), 
        __metadata('design:paramtypes', [])
    ], ContainsFilterPipe);
    return ContainsFilterPipe;
}());
//# sourceMappingURL=contains-filter.js.map