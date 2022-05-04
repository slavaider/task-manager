import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loadBoards } from 'src/app/store/actions/boards.actions';
import { CreateBoardFormComponent } from '../../components/create-board-form/create-board-form.component';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  constructor(private store: Store, public form: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadBoards());
  }

  public create() {
    this.form.open(CreateBoardFormComponent);
  }
}
