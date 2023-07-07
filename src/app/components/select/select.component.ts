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
  selectedProvince: string='';

  constructor(private dataService: DataService, private stateService:StateService) { }

  ngOnInit():void {
    this.getProvinces();
  }

  getProvinces = async () => {
    await this.dataService.getProvinces().subscribe((resp: any) => {
      this.provinces = resp.provincias;
     // console.log(this.provinces);
      for(let p in  this.provinces){
        this.misProvincias.push(this.provinces[p]);
      }
      console.log(this.misProvincias);
    });
  }

  onProvinceChange(event: any) {
    const value = event.target.value;
    this.selectedProvince = value;
    this.dataService.setObjeto(this.selectedProvince);
    this.stateService.setComponenteEjecutado(1,true); //El usuario ha seleccionado una provincia, paso 1 OK.
    
  }
}
