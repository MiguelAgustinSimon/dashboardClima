import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private stateSubject = new Subject<boolean>();

  stateObservable = this.stateSubject.asObservable();

  changeState(newState: boolean) {
    this.stateSubject.next(newState);
  }

}
