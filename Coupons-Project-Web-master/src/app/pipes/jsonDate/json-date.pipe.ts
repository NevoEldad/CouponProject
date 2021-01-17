import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonDate'
})
export class JsonDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var str = JSON.stringify(value).slice(0, (JSON.stringify(value).length - 6) ) + '"';
    var date: Date = new Date(JSON.parse(str));
    return date.toDateString();
  }

}
