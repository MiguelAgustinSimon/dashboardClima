import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-distance-chart',
  templateUrl: './distance-chart.component.html',
  styleUrls: ['./distance-chart.component.css']
})
export class DistanceChartComponent implements OnInit {
  distanceOk:boolean=false;
  distancias: any[] = [];
  chart: Chart;
  
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.getDistanceEvents();
   
  }

  getDistanceEvents=async()=>{
     //Aca escuchar al interruptor
     (await this.dataService.getDistanceEvents()).subscribe((resp: any) => {
      for(let v in resp.valores){
        this.distancias.push(resp.valores[v]);
      }
      if(this.distancias.length>0){
        this.distanceOk=true;
      }
      console.log(this.distancias);
      this.createBarChartDistance();
    });
  }


  ngOnDestroy() {
    // Destruir el gráfico al salir del componente
    if (this.chart) {
      this.chart.destroy();
    }
  }


  createBarChartDistance() {
    // Destruir el gráfico existente si ya existe
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.distancias.map((_, index) => index),
        datasets: [
          {
            label: 'Distancias',
            data: this.distancias,
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
            borderColor: 'rgba(0, 0, 255, 1)',  
            borderWidth: 1
          }
        ]
      }
    });
  }


}
