import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventParams'
})
export class EventParamsPipe implements PipeTransform {

  transform(value: object, args?: any): string {
    const items = new Array<string>();

    const numItems = Object.keys(value).length / 2;
    for (let i = 0; i < numItems; i++) {
      items.push(value[i]);

    }

    return items.join(', ');
  }

}
