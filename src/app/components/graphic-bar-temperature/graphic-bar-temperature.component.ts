import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-graphic-bar-temperature',
  templateUrl: './graphic-bar-temperature.component.html',
  styleUrls: ['./graphic-bar-temperature.component.css']
})
export class GraphicBarTemperatureComponent implements OnInit {
  temperatureOk:boolean=false;
  tempraturas: any[] = [];
  chart: Chart;
  
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.getTemperatureEvents();
   
  }

  getTemperatureEvents=async()=>{
     //Aca escuchar al interruptor
     (await this.dataService.getTemperatureEvents()).subscribe((resp: any) => {
      for(let v in resp.valores){
        this.tempraturas.push(resp.valores[v]);
      }
      if(this.tempraturas.length>0){
        this.temperatureOk=true;
      }
      console.log(this.tempraturas);
      this.createBarChartTemperature();
    });
  }


  ngOnDestroy() {
    // Destruir el gráfico al salir del componente
    if (this.chart) {
      this.chart.destroy();
    }
  }


  createBarChartTemperature() {
    // Destruir el gráfico existente si ya existe
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.tempraturas.map((_, index) => index),
        datasets: [
          {
            label: 'Temperaturas',
            data: this.tempraturas,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxis: {
            beginAtZero: true
          }
        }
      }
    });
  }



}
