import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl = "http://localhost:3000/tasks";
  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id: number | undefined)
  {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(task: Task)
  {
    return this.http.post<Task>(this.apiUrl,task);
  }

  completed(id: number | undefined,completed: boolean){
    return this.http.patch(`${this.apiUrl}/${id}`, {
      completed: !completed
    })
  }

  update(task: Task){
    return this.http.put(`${this.apiUrl}/${task.id}`,task);
  }
}
