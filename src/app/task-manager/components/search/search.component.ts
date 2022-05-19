import { Component, Inject, OnInit } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchWord = "";

  constructor(
    private search: SearchService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
  ) {}

  ngOnInit(): void {
    this.searchWord = this.i18NextService.t('boardPage.search');
  }

  public handleInput(value: string) {
    this.search.setValue(value);
  }
}
