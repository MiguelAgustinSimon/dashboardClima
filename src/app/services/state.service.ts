import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private stateSubject = new Subject<boolean>();
  private provinceSubject = new BehaviorSubject<number>(0);

  stateObservable = this.stateSubject.asObservable();
  provinceObservable = this.provinceSubject.asObservable();

  changeState(newState: boolean) {
    this.stateSubject.next(newState);
  }
  changeProvince(newProvince: number) {
    this.provinceSubject.next(newProvince);
  }

}
