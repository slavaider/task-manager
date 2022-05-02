import { Component, Input } from '@angular/core';
import { IBoard } from '../../../store/models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input()
  public board: IBoard | null = null;
}
