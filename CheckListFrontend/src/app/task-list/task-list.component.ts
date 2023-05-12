import { Component } from '@angular/core';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { Sort } from '@angular/material/sort'

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

  priorityFilter: string[] = [];
  statusFilter: string = "";

  sortedData: Task[] = [];

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
  onDeleteTask(position: number): void{
    this.taskService.deleteTask(position).subscribe(
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

  // Printing filtered tasks
  onFilteredSearch() {
    if(this.priorityFilter.length == 0) this.priorityFilter = ["high", "medium", "low"];

    this.taskService.getFilteredTask(this.priorityFilter, this.statusFilter).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }
  // Adding/Removing checkbox values for priority filtering
  checkCheckBoxvalue(event: any) {
    if(event.target.checked){
      // Add value
      this.priorityFilter.push(event.target.value);
    }
    if(!event.target.checked){
      // Remove values
      let index = this.priorityFilter.indexOf(event.target.value);
      if( index !== -1) this.priorityFilter.splice(index, 1);
    }
  }

  onSortByNo() {
    this.tasks.reverse();
  }

  sortData(sort: Sort) {
    const data = this.tasks;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'position':
          return this.compare(a.position, b.position, isAsc);
        case 'task':
          return this.compare(a.task, b.task, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
