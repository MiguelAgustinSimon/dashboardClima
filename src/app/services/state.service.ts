import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private selectComponent: boolean = false;
  private dashboardComponent: boolean = false;

  setComponenteEjecutado(component:number, value: boolean) {
    switch(component) { 
      case 1: { 
         this.selectComponent=true;          
         break; 
      } 
      case 2: { 
        this.dashboardComponent=true; 
        break; 
     } 
      default: { 
         this.selectComponent=false;
         this.dashboardComponent=false;
         break; 
      } 
   } 
  }

  getComponenteEjecutado(component:number) {
    switch(component) { 
      case 1: { 
         return this.selectComponent; 
         break; 
      } 
      case 2: { 
        return this.dashboardComponent; 
        break; 
     } 
      default: { 
        return false;
         break; 
      } 
   } 
  }

}
