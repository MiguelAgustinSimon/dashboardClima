import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';
import { District } from '../interfaces/district';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private stateSubject = new Subject<boolean>();
  private provinceSubject = new BehaviorSubject<number>(0);
  private provinceUpdateSubject = new BehaviorSubject<boolean>(false);
  private districtSubject = new Subject<boolean>();

  stateObservable = this.stateSubject.asObservable();
  provinceObservable = this.provinceSubject.asObservable();
  stateProvinceObservable = this.provinceUpdateSubject.asObservable();
  districtObservable = this.districtSubject.asObservable();


  changeState(newState: boolean) {
    this.stateSubject.next(newState);
  }
  changeProvince(newProvince: number) {
    this.provinceSubject.next(newProvince);
  }
  changeStateProvince(newState: boolean) {
    this.provinceUpdateSubject.next(newState);
  }
  changeStateDistrict(newState: boolean) {
    this.districtSubject.next(newState);
  }

}
