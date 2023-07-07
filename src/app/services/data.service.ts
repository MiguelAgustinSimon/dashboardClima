import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Province } from '../interfaces/province';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  getProvinces =()=> {
    return this.http.get<Province[]>(`https://www.el-tiempo.net/api/json/v2/provincias`);
  } 

  getProvince= async(id:number)=> {
    return this.http.get<Province>(`https://www.el-tiempo.net/api/json/v2/provincias/${id}`);
  } 

}
