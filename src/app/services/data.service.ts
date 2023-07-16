import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Province } from '../interfaces/province';
import { District } from '../interfaces/district';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  private objeto: any;
  private ciudades: any[] = [];
  private district:District;

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

  getDistrictsByProvince = async (idProvince:number) => {
    return this.http.get<District[]>(`https://www.el-tiempo.net/api/json/v2/provincias/${idProvince}/municipios`);
  }

  getDistrict = async (idProvince:number, id: string) => {
    return this.http.get<District>(`https://www.el-tiempo.net/api/json/v2/provincias/${idProvince}/municipios/${id}`);
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

  saveDistrict(objet: District) {
    this.district=objet;
  }

  getSavedDistrict=async()=>{
    return this.district;
  }

  getTemperatureEvents = async () => {    
    return this.http.get<[]>(`http://localhost:3000/api/getTemperatureEvents`);
  }
  
  getHumidityEvents = async () => {
    return this.http.get<[]>(`http://localhost:3000/api/getHumidityEvents`);
  }
  
}
