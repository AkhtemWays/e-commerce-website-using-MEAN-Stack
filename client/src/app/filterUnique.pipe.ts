import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnique',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    // Remove the duplicate elements
    let uniqueObjects = [];
    let uniqueIds = [];
    for (let i = 0; i < value.length; i++) {
      if (!uniqueIds.includes(value[i]._id)) {
        uniqueIds.push(value[i]._id);
        uniqueObjects.push(value[i]);
      }
    }

    return uniqueObjects;
  }
}
