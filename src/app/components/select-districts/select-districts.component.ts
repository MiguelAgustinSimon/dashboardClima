import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/interfaces/district';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-select-districts',
  templateUrl: './select-districts.component.html',
  styleUrls: ['./select-districts.component.css']
})
export class SelectDistrictsComponent implements OnInit {
  selectedProvince: number;
  selectedDistrict: number;
  districts:District[];
  myDistricts:District[]=[];

  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    this.stateService.provinceObservable.subscribe(async (newProvince) => {
      this.selectedProvince = newProvince;
      console.log(this.selectedProvince);
      
      this.getDistrictsByProvince(this.selectedProvince);
    });
  }


  getDistrictsByProvince = async (idProvince:number) => {
    await (await this.dataService.getDistrictsByProvince(idProvince)).subscribe((resp: any) => {
      this.districts=[];
      this.myDistricts=[];
      this.districts=resp.municipios;
      for(let p in  this.districts){
        this.myDistricts.push(this.districts[p]);
      }
    });
  }

  onDistrictChange(event: any) {
    this.selectedDistrict = event.target.value; 
    console.log(this.selectedDistrict);
    
  }


}
