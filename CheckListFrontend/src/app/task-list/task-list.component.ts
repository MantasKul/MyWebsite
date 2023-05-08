import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = []; //=[]
  task: Task;
  editing: boolean = false;
  id: number | undefined;
  newTask: Task | undefined;
  priorityOptions = ["High", "Medium", "Low"];

  constructor(private taskService: TaskServiceService){ 
    this.task = new Task();
  }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
    })
  }

  onAddTask() {
    this.taskService.addTask(this.task).subscribe(
      () =>{
        this.ngOnInit();
        this.task.task = '';
      }
    );
  }

  // Deleting entry by id
  onDeleteTask(id: number): void{
    this.taskService.deleteTask(id).subscribe(
      () =>{
        this.ngOnInit();
      }
    );
  }

  // Changing "done" value to true in db
  onFinishTask(id: number): void{
    this.taskService.finishTask(id).subscribe(
      () =>{
        this.ngOnInit();
      }
    );
  }

  // Enabling editing by id
  onEdit(id: number): void {
    this.editing = !this.editing;
    this.id = id;
  }

  onSaveEdit(task: Task): void{
    this.editing = !this.editing;
    this.id = -1;

    this.newTask = task;
    this.newTask.task = (<HTMLInputElement>document.getElementById('textInput')).value;

    this.taskService.editTask(this.newTask).subscribe(
      () =>{
        this.ngOnInit();
      }
    );
  }

  // At the moment when searching for a string that doesn't match any task
  // it will display all tasks although the array is empty
  onSearch(searchValue: string): void {
    var searchResults: Task[] = [];
    
    for(const task of this.tasks){
      if(task.task?.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1) searchResults.push(task);
    }

    this.tasks = searchResults;

    if(searchResults.length === 0 || !searchValue) this.ngOnInit();
  }
}
