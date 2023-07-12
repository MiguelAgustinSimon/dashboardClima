import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-graphic-bar',
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.css']
})
export class GraphicBarComponent implements OnInit, OnDestroy {
  updatedProvince: boolean = false;
  ciudades: any[] = []; // Arreglo de ciudades con temperaturas mínimas y máximas
  labels: string[] = []; // Arreglo de etiquetas para los nombres de las ciudades
  temperaturasMin: number[] = []; // Arreglo de temperaturas mínimas
  temperaturasMax: number[] = []; // Arreglo de temperaturas máximas
  chart: Chart;

  @ViewChild('myCanvas') canvasRef: ElementRef;
  constructor(private dataService: DataService, private stateService: StateService) { }

  ngOnInit() {
    Chart.register(...registerables);

    //Aca escuchar al interruptor
    this.stateService.stateProvinceObservable.subscribe((newState) => {
      this.updatedProvince = newState;
      this.createGraphic();
    });
  }


  ngOnDestroy() {
    // Destruir el gráfico al salir del componente
    if (this.chart) {
      this.chart.destroy();
    }
  }

  async createGraphic() {
    this.labels = [];
    this.temperaturasMin = [];
    this.temperaturasMax = [];
    // Asignar los datos de temperaturas y nombres de ciudades
    this.ciudades = await this.dataService.getCiudades();

    this.ciudades.forEach((ciudad: any) => {
      this.labels.push(ciudad.name);
      this.temperaturasMin.push(Number(ciudad.tempMin));
      this.temperaturasMax.push(Number(ciudad.tempMax));
    });

    this.createBarChart();
  }

  createBarChart() {
    // Destruir el gráfico existente si ya existe
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Temperatura Mínima',
            data: this.temperaturasMin,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Temperatura Máxima',
            data: this.temperaturasMax,
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
