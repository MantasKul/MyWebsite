import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { TaskServiceService } from '../task-service.service';
import { MatSort, Sort } from '@angular/material/sort'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  tasks: Task[] = [];
  displayedColumns: string[] = ['position', 'priority', 'task', 'Buttons'];
  task: Task;
  newTask: Task | undefined;

  // Variables used for filtering
  priorityOptions = ["High", "Medium", "Low"];
  priorityFilter: string[] = [];
  statusFilter: string = "";

  // Variables used when editting the task
  editing: boolean = false;
  editingId: number;
  priorityValue: string;
  taskInput: string;

  // Variables used for pagination
  dataSource = new MatTableDataSource<Task>(this.tasks);
  @ViewChild('paginator') paginator: MatPaginator;

  // Variables used for sorting
  @ViewChild('sortTable') sortTable = new MatSort();
  sortedData: Task[] = [];


  constructor(private taskService: TaskServiceService){ 
    this.task = new Task();
  }

  ngAfterViewInit(): void {
      this.dataSource = new MatTableDataSource(this.tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sortTable;
  }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.tasks = data;
      this.dataSource.data = data;
    })
  }

  // Adding new task
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
    this.editingId = id;
  }
  // Saving the edits
  onSaveEdit(task: Task): void{
    this.editing = !this.editing;
    this.editingId = -1;

    this.newTask = task;
    this.newTask.priority = this.priorityValue;
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
}
