package com.CheckList.Check.List;

import com.CheckList.Check.List.model.Task;
import com.CheckList.Check.List.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskResource {
    private final TaskService taskService;

    public TaskResource(TaskService taskService) {this.taskService = taskService;}

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        Task newTask = taskService.addTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Task>> getAllTasks(){
        List<Task> tasks = taskService.findAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id){
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/finish/{id}")
    public ResponseEntity<?> finishTask(@PathVariable("id") Long id){
        taskService.finishTask(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editTask(@RequestBody Task task){
        Task newTask = taskService.updateTask(task);
        return new ResponseEntity<>(newTask, HttpStatus.OK);
    }
}
