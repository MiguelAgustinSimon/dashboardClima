import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css']
})
export class DistrictsComponent implements OnInit {

  constructor(private dataService: DataService, private stateService:StateService) { }
  
  selectComponent: boolean = false;
  
  ngOnInit() {
    this.stateService.stateObservable.subscribe((newState) => {
      this.selectComponent=newState;
    });
  }

}
