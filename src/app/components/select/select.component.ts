import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { Province } from '../../interfaces/province';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  provinces: Province[];
  misProvincias:Province[]=[];
  selectedProvince: number;

  constructor(private dataService: DataService, private stateService:StateService) { }

  ngOnInit():void {
    this.getProvinces();
  }

  getProvinces = async () => {
    await (await this.dataService.getProvinces()).subscribe((resp: any) => {
      this.provinces = resp.provincias;
      for(let p in  this.provinces){
        this.misProvincias.push(this.provinces[p]);
      }
    });
  }

  onProvinceChange(event: any) {
    this.selectedProvince = event.target.value;   
    this.stateService.changeProvince(this.selectedProvince);
    this.stateService.changeState(true); //El usuario ha seleccionado una provincia, paso 1 OK.
  }
}
