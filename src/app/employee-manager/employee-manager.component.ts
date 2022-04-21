import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-manager',
  templateUrl: './employee-manager.component.html',
  styleUrls: ['./employee-manager.component.css']
})
export class EmployeeManagerComponent implements OnInit {

  public employees: Employee[] = [];
  public editEmployee: Employee|undefined;
  public deleteEmployee: Employee|undefined;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => this.employees = response,
      error: (error:HttpErrorResponse) => alert(error.message)
    });
  }

  public onAddEmloyee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    });
  }

  public onUpdateEmloyee(employee: Employee): void{
    document.getElementById('add-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error:HttpErrorResponse) => alert(error.message)
    });
  }

  public onDeleteEmloyee(employeeId: number|undefined): void{
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: response => {
        console.log(response);
        this.getEmployees();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchEmployees(key: string): void{
    const results: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phoneNr.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees = results;
    if(results.length === 0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModal(employee: Employee|undefined, mode: string): void{
    const container = document.getElementById('main-container');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      btn.setAttribute('data-target', '#addEmployeeModal');
    }
    else if(mode === 'edit'){
      this.editEmployee = employee;
      btn.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if(mode === 'delete'){
      this.deleteEmployee = employee;
      btn.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(btn);
    btn.click();
  }

}
