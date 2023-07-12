import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { District } from 'src/app/interfaces/district';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {
  districtReady = false;
  chart: Chart;
  labels: string[] = ['Viento','Humedad','Precipitaciones','Temp. Actual','Temp. Max','Temp. Min'];
  myDistrict: District;
  datos: number[] = [];

   @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit(): void { 
    Chart.register(...registerables);   
    this.getDistrict();
  }

  getDistrict = async () => {
    try {
      await this.dataService.getSavedDistrict()
      .then((resp: District) => {
        this.myDistrict = resp;
        console.log(this.myDistrict);
        this.districtReady=true;
        this.createGraphic();
      })
      .catch(error => {
        console.error(error);
      });

    } catch (error) {
      console.log(error);
    }
  }

  async createGraphic() {
    for (let i = 0; i < 1; i++) {
      this.datos.push(Number(this.myDistrict.viento));
      this.datos.push(Number(this.myDistrict.humedad));
      this.datos.push(Number(this.myDistrict.prob_precipitacion));
      this.datos.push(Number(this.myDistrict.tempActual));
      this.datos.push(Number(this.myDistrict.tempMax));
      this.datos.push(Number(this.myDistrict.tempMin));
    }
    //console.log(this.datos);
    
    this.createBarChart();
  }

  createBarChart() {
    // Destruir el gráfico existente si ya existe
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    const randomColors = this.labels.map(() => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return `rgba(${r}, ${g}, ${b}, 0.5)`;
    });

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.datos,
          backgroundColor: randomColors,
          borderColor: randomColors.map(color => color.replace('0.5', '1')),
          borderWidth: 1
        }]
      },
      options: {
        indexAxis: 'y',
        plugins: {
          title: {
            display: true,
            text: `Estado actual del Distrito: ${this.myDistrict.NOMBRE}`
          }
        }
      }
    });
  }



}
