import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Province } from '../../interfaces/province';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  objeto: any;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.objeto = this.dataService.getObjeto();
    //console.log(this.objeto);
  }


  
  

}
