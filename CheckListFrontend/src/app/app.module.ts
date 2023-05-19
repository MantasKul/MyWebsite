import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatTableModule } from '@angular/material/table'  
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select'; 
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRout: Routes = [
  {path: '', component: AboutComponent}, // {path: '', comredirectTo: 'Task', pathMatch: 'full'},
  {path: 'About', component: AboutComponent},
  {path: 'Task', component: TaskListComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRout),
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
