import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Province } from '../../interfaces/province';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  provinces: Province[];
  misProvincias:Province[]=[];
  selectedProvince: string='';


  constructor(private provinceService: DataService) { }

  ngOnInit():void {
    this.getProvinces();
  }

  getProvinces = async () => {
    await this.provinceService.getProvinces().subscribe((resp: any) => {
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
    console.log(this.selectedProvince);
  }
  
  

}
