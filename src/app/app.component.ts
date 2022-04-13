import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee: Employee|undefined;

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
      btn.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(btn);
    btn.click();
  }
}
