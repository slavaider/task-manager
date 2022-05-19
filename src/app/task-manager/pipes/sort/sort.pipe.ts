import { Pipe, PipeTransform } from '@angular/core';
import { IColumn, ITask } from 'src/app/store/models/board.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: ITask[]): ITask[] {
    return [...array]
      .sort((a, b) => a.order - b.order);
  }
}
