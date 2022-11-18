import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiEmployeeService {

  constructor(private http:HttpClient) { }

  // post employee
  postEmployee(data:any){
    return this.http.post<any>('http://localhost:3000/posts/',data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // get employee
  getEmployee(){
    return this.http.get<any>('http://localhost:3000/posts/')
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // update empployee
  updateEmployee(data:any,id:any){
    return this.http.put('http://localhost:3000/posts/'+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  // delete employee

  deleteEmployee(id:number){
    return this.http.delete<any>('http://localhost:3000/posts/'+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
