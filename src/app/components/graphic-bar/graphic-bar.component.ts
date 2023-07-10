import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-graphic-bar',
  templateUrl: './graphic-bar.component.html',
  styleUrls: ['./graphic-bar.component.css']
})
export class GraphicBarComponent implements OnInit {
  ciudades: any[] = []; // Arreglo de ciudades con temperaturas mínimas y máximas
  labels: string[] = []; // Arreglo de etiquetas para los nombres de las ciudades
  temperaturasMin: number[] = []; // Arreglo de temperaturas mínimas
  temperaturasMax: number[] = []; // Arreglo de temperaturas máximas
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    Chart.register(...registerables);

    // Asignar los datos de temperaturas y nombres de ciudades
    this.ciudades = this.dataService.getCiudades();
    console.log(this.ciudades);
    
    this.ciudades.forEach((ciudad: any) => {      
      this.labels.push(ciudad.name);
      this.temperaturasMin.push(Number(ciudad.tempMin));
      this.temperaturasMax.push(Number(ciudad.tempMax));
    });
  
    this.createBarChart();
  }
  
  createBarChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    const myChart = new Chart(ctx, {
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
