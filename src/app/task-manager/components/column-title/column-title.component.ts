import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ColumnRequestService } from 'src/app/core/services/request/column-request.service';
import { loadBoard } from 'src/app/store/actions/boards.actions';
import { IColumn } from 'src/app/store/models/board.model';

@Component({
  selector: 'app-column-title',
  templateUrl: './column-title.component.html',
  styleUrls: ['./column-title.component.scss']
})
export class ColumnTitleComponent implements OnInit {
  public isShowField: boolean = false;

  @Input() public boardId!: string;
  @Input() public column!: IColumn;

  public editForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private request: ColumnRequestService,
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      title: [this.column.title, Validators.required],
    });
  }

  public get title(): AbstractControl | null {
    return this.editForm.get('title');
  }

  public show() {
    this.isShowField = true;
  }

  public hide() {
    this.editForm.setValue({ ['title']: this.column.title })
    this.isShowField = false;
  }

  public submit(column: IColumn) {
    const { title } = this.editForm.value;
    const { id: columnId, order } = column;

    this.request.updateColumn(
      this.boardId, columnId, title, order
    ).subscribe(() => {
      this.store.dispatch(loadBoard({ id: this.boardId }));
    });
  }
}
