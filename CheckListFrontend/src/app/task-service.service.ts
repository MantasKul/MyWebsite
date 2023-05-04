import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  url: string;

  constructor(private http: HttpClient) { this.url = 'http://localhost:8080/task'; }

  public getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(`${this.url}/all`);
  }

  public addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.url}/add`, task);
  }

  public deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
  public finishTask(id: number): Observable<void> {
    return this.http.put<void>(`${this.url}/finish/${id}`, id);
  }
  public editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.url}/edit`, task);
  }
}
