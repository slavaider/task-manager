import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from 'src/app/store/models/board.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: ITask[], value: string): ITask[] {
    return tasks.filter((task) => task.title.includes(value));
  }
}
