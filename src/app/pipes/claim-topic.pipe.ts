import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment';

@Pipe({
  name: 'claimTopic'
})
export class ClaimTopicPipe implements PipeTransform {

  transform(value: string): string {

    // @ts-ignore
    if (environment.ClaimTopicMap[value]) {
      // @ts-ignore
      return environment.ClaimTopicMap[value];
    }

    return 'Unknown (' + value + ')';
  }

}
