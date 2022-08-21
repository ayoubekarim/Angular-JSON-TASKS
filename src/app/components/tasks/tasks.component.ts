import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  editForm = false;
  showForm =false;
  searchText = "";
  tasks: Task[] = [];
  resultTasks: Task[] = [];
  myTask: Task = {
    label: '',
    completed: false
  }

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.getTasks();  }

  getTasks()
  {
    this.taskService.findAll().subscribe(taskss => this.resultTasks= this.tasks = taskss)
    
  }

  deleteTask(id: number | undefined)
  {
    this.taskService.delete(id)
    .subscribe(() => {
      this.tasks =this.tasks.filter(task => 
        task.id != id );
        this.resetTask();
    })
  }
  persistTask() {
    this.taskService.persist(this.myTask)
    .subscribe((task) => {
      this.tasks = [task, ...this.tasks];
      this.resetTask();
    }) ;
  }


  resetTask(){
    this.myTask = {
      label:'',
      completed: false
    }
  }

  toggleCompleted(task: Task)
  {
    this.taskService.completed(task.id,task.completed)
    .subscribe(() => {
          task.completed = !task.completed;
    })
  }

  editTask(task: Task)
  {
      this.myTask = task;
      this.editForm = true;
  }

  updateTask(){
    this.taskService.update(this.myTask)
    .subscribe((task) => {
      this.resetTask();
      this.editForm = false;

    })
  }


  searchTasks(){
   this.resultTasks = this.tasks.filter( (task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()) );
  }
}
