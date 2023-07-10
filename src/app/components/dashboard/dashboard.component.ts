import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { StateService } from 'src/app/services/state.service';

import { City } from '../../interfaces/city';
import { map } from 'rxjs';
import { Province } from 'src/app/interfaces/province';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedProvince: number;
  myCity: City;
  citiesArray: City[] = [];
  provinceReady = false;
  myProvince: Province;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    this.stateService.provinceObservable.subscribe((newProvince) => {
      this.selectedProvince = newProvince;
      this.getProvince(this.selectedProvince);
    });
  }


  getProvince = async (id: number) => {
    await (await this.dataService.getProvince(id)).pipe(
      map((resp: any) => {
        this.citiesArray=[];
        this.dataService.setCiudadesToNull();

        for (const ciudad of resp.ciudades) {
          this.myCity = {
            name: ciudad.name,
            stateSky: ciudad.stateSky.description,
            tempMax: parseInt(ciudad.temperatures.max, 10),
            tempMin: parseInt(ciudad.temperatures.min, 10)
          }
          this.citiesArray.push(this.myCity);
          // Crear un nuevo objeto de Provincia con los datos de la respuesta
          this.myProvince = {
            CODPROV: this.selectedProvince.toString(),
            NOMBRE_PROVINCIA: resp.title,
            today: resp.today.p,
            tomorrow: resp.tomorrow.p,
            cities: this.citiesArray
          }
        }
        
        // Asigno al DS para pasarselo al componente de graficos
        this.dataService.setCiudades(this.citiesArray);
        this.provinceReady = true;
      })
    ).subscribe();
  }





}
