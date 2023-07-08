import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { Province } from '../../interfaces/province';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedProvince: number;

  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    
    console.log(`llego a cambiar province:`);

    this.stateService.provinceObservable.subscribe((newProvince) => {
      this.selectedProvince=newProvince;
      console.log(this.selectedProvince);
      
      this.getProvince(this.selectedProvince);
    });
  }


  getProvince = async (id: number) => {
    await (await this.dataService.getProvince(id)).subscribe((resp: any) => {
      console.log(resp);
    });
  }






}
