import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ContainsFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'containsFilter',
})
export class ContainsFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filter: Object) {
    if (!items || !filter["value"]) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => (item[filter["key"]]).toLowerCase().includes(filter["value"].toLowerCase()));
  }
}
