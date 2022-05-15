import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(
    private search: SearchService,
  ) {}

  ngOnInit(): void {
  }

  public handleInput(value: string) {
    this.search.setValue(value);
  }
}
