import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private stateSubject = new Subject<boolean>();
  private provinceSubject = new BehaviorSubject<number>(0);
  private provinceUpdateSubject = new BehaviorSubject<boolean>(false);

  stateObservable = this.stateSubject.asObservable();
  provinceObservable = this.provinceSubject.asObservable();
  stateProvinceObservable = this.provinceUpdateSubject.asObservable();


  changeState(newState: boolean) {
    this.stateSubject.next(newState);
  }
  changeProvince(newProvince: number) {
    this.provinceSubject.next(newProvince);
  }
  changeStateProvince(newState: boolean) {
    this.provinceUpdateSubject.next(newState);
  }

}
