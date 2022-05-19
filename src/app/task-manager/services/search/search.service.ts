import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private value = new Subject<string>();
  public value$ = this.value.asObservable();
  
  public setValue(value: string): void {
    this.value.next(value);  // send to board page
  }
}
