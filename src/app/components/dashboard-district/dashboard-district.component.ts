import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { map } from 'rxjs';
import { District } from 'src/app/interfaces/district';

@Component({
  selector: 'app-dashboard-district',
  templateUrl: './dashboard-district.component.html',
  styleUrls: ['./dashboard-district.component.css']
})
export class DashboardDistrictComponent implements OnInit {
  districtReady = false;

  myDistrict: District;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit(): void {
    console.log("Llego a dashboard nuevo");
    
    this.getDistrict();
    
  }

  getDistrict = async () => {
    try {
      await this.dataService.getSavedDistrict()
      .then((resp: District) => {
        this.myDistrict = resp;
        console.log(this.myDistrict);
        this.districtReady=true;
      })
      .catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.log(error);
    }
  }



}
