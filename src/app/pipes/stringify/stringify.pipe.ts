
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringify'
})
export class StringifyPipe implements PipeTransform {

    transform(value: object): string {
        return JSON.stringify(value);
    }

}
