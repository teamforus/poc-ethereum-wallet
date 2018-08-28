import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'claimIssuer'
})
export class ClaimIssuerPipe implements PipeTransform {

  transform(value: string): string {

    if (environment.ClaimIssuerMap[value]) {
      return environment.ClaimIssuerMap[value];
    }

    return 'Unknown (' + value + ')';
  }

}
