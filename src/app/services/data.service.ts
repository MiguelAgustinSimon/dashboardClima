import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Province } from '../interfaces/province';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private objeto: any;
  private ciudades: any[] = [];

  setObjeto(data: any) {
    this.objeto = data;
  }

  getObjeto() {
    return this.objeto;
  }

  getProvinces = async () => {
    return this.http.get<Province[]>(`https://www.el-tiempo.net/api/json/v2/provincias`);
  }

  getProvince = async (id: number) => {
    return this.http.get<Province>(`https://www.el-tiempo.net/api/json/v2/provincias/${id}`);
  }

  getCiudades=async()=>{
    return this.ciudades;
  }

  setCiudades(ciudades: any[]): void {
    this.ciudades = ciudades;
  }

  setCiudadesToNull(): void {
    this.ciudades = [];
  }
  
}
