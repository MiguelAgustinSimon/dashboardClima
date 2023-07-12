import { Component, OnInit } from '@angular/core';
import { District } from 'src/app/interfaces/district';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-select-districts',
  templateUrl: './select-districts.component.html',
  styleUrls: ['./select-districts.component.css']
})
export class SelectDistrictsComponent implements OnInit {
  selectedProvince: number;
  selectedDistrict: number;
  districts: District[];
  myDistricts: District[] = [];
  myDistrict: District;
  districtsArray: District[] = [];

  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    this.stateService.provinceObservable.subscribe(async (newProvince) => {
      this.selectedProvince = newProvince;
      console.log(this.selectedProvince);

      this.getDistrictsByProvince(this.selectedProvince);
    });
  }


  getDistrictsByProvince = async (idProvince: number) => {
    await (await this.dataService.getDistrictsByProvince(idProvince)).subscribe((resp: any) => {
      this.districts = [];
      this.myDistricts = [];
      this.districts = resp.municipios;
      for (let p in this.districts) {
        this.myDistricts.push(this.districts[p]);
      }
    });
  }

  async onDistrictChange(event: any) {
    this.selectedDistrict = event.target.value;
    let digits = this.selectedDistrict.toString().slice(0, 5);
    console.log(digits);
    await this.getDistrict(this.selectedProvince, digits);
  }

  getDistrict = async (idProvince: number, id: string) => {
    await (await this.dataService.getDistrict(idProvince, id)).pipe(
      map((resp: any) => {
        this.myDistrict = {
          CODIGOINE: resp.municipio.CODIGOINE,
          CODPROV: resp.municipio.CODPROV,
          NOMBRE: resp.municipio.NOMBRE,
          POBLACION_MUNI: resp.municipio.POBLACION_MUNI,
          SUPERFICIE: resp.municipio.SUPERFICIE,
          stateSky: resp.stateSky.description,
          tempActual: resp.temperatura_actual,
          tempMin: parseInt(resp.temperaturas.min, 10),
          tempMax: parseInt(resp.temperaturas.max, 10),
          humedad: resp.humedad,
          viento: resp.viento,
          prob_precipitacion: 50
        }
        this.districtsArray.push(this.myDistrict);
        this.saveObject(this.myDistrict);
        this.stateService.changeStateDistrict(true); //El usuario ha seleccionado un distrito, districts lo detecta y muestra dashboard-district.


      })
    ).subscribe();
  }

  saveObject = async (district: District) => {
    this.dataService.saveDistrict(district);
  }

}
