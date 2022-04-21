import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeeManagerComponent } from './employee-manager/employee-manager.component';
import { ServerManagerComponent } from './server-manager/server-manager.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeManagerComponent,
    ServerManagerComponent
  ],
  imports: [
    RouterModule.forRoot([
      {path: 'employee-manager', component: EmployeeManagerComponent},
      {path: 'server-manager', component: ServerManagerComponent},
    ]),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
