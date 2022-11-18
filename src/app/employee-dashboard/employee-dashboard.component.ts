import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiEmployeeService } from '../service/api-employee.service';
import { EmployeeModel } from './employee-dashboard-model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
formvalue:any
res:any
employeeData:any
showAdd:any
showUpdate:any

// err:any
employeeModelObj:EmployeeModel=new EmployeeModel()
  constructor(private formbulider:FormBuilder,private api:ApiEmployeeService) { }

  ngOnInit(): void {
 this.formvalue=this.formbulider.group({
  firstName : [''],
  lastName : [''],
  email : [''],
  mobile : [''],
  salary : [''],

 })
 this. getAllEmployee()
  }
  clickAddEmploye(){
    // this.formvalue.reset()
    this.showAdd=true
    this.showUpdate=false


  }
  // data added to the json folder
 postEmployeeDetailes(){
  this.employeeModelObj.firstName=this.formvalue.value.firstName
  this.employeeModelObj.lastName=this.formvalue.value.lastName
  this.employeeModelObj.email=this.formvalue.value.email
  this.employeeModelObj.mobile=this.formvalue.value.mobile
  this.employeeModelObj.salary=this.formvalue.value.salary


  this.api.postEmployee(this.employeeModelObj)
  .subscribe(res=>{
    console.log(res);
    alert(`Employee name=${this.employeeModelObj.firstName} is added successfully`)
    let ref=document.getElementById('cancel')
    ref?.click()
     this.formvalue.reset()
     this. getAllEmployee()

  })
 }
// data display on the html page
 getAllEmployee(){
  this.api.getEmployee()
  .subscribe((res)=>{
    this.employeeData=res
  })
 }
// delete data from html page
 deleteEmployee(row:any){
  this.api.deleteEmployee(row.id)
  .subscribe((res)=>{
    alert(`${row.firstName} detailes are  Deleted`)
    this. getAllEmployee()

  })
 }

//  edit employee detailes

editEmployee(row:any){
  this.showAdd=false
  this.showUpdate=true

  this.employeeModelObj.id=row.id
  this.formvalue.controls['firstName'].setValue(row.firstName)
  this.formvalue.controls['lastName'].setValue(row.lastName)
  this.formvalue.controls['email'].setValue(row.email)
  this.formvalue.controls['mobile'].setValue(row.mobile)
  this.formvalue.controls['salary'].setValue(row.salary)

}

// update employee
updateEmployee(){
  this.employeeModelObj.firstName=this.formvalue.value.firstName
  this.employeeModelObj.lastName=this.formvalue.value.lastName
  this.employeeModelObj.email=this.formvalue.value.email
  this.employeeModelObj.mobile=this.formvalue.value.mobile
  this.employeeModelObj.salary=this.formvalue.value.salary

  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe((res=>{
    alert(`Updated ${this.employeeModelObj.firstName} detailes Succesfully`)
    let ref=document.getElementById('cancel')
    ref?.click()
     this.formvalue.reset()
     this. getAllEmployee()
  }))
}

}
