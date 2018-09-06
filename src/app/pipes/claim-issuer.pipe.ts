import { Pipe, PipeTransform } from '@angular/core';
import { environment } from './../../environments/environment';

@Pipe({
  name: 'claimIssuer'
})
export class ClaimIssuerPipe implements PipeTransform {

  transform(value: string): string {

    // @ts-ignore
    if (environment.ClaimIssuerMap[value]) {
      // @ts-ignore
      return environment.ClaimIssuerMap[value];
    }

    return 'Unknown (' + value + ')';
  }

}
