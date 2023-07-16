import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-graphic-bar-humidity',
  templateUrl: './graphic-bar-humidity.component.html',
  styleUrls: ['./graphic-bar-humidity.component.css']
})
export class GraphicBarHumidityComponent implements OnInit {

  humidityOk:boolean=false;
  humedades: any[] = [];
  chart: Chart;
  
  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.getHumidityEvents();
   
  }

  getHumidityEvents=async()=>{
     //Aca escuchar al interruptor
     (await this.dataService.getHumidityEvents()).subscribe((resp: any) => {
      for(let v in resp.valores){
        this.humedades.push(resp.valores[v]);
      }
      if(this.humedades.length>0){
        this.humidityOk=true;
      }
      console.log(this.humedades);
      this.createBarChartHumidity();
    });
  }


  ngOnDestroy() {
    // Destruir el gráfico al salir del componente
    if (this.chart) {
      this.chart.destroy();
    }
  }


  createBarChartHumidity() {
    // Destruir el gráfico existente si ya existe
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.humedades.map((_, index) => index),
        datasets: [
          {
            label: 'Humedades',
            data: this.humedades,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
