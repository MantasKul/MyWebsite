package com.CheckList.Check.List.service;

import com.CheckList.Check.List.model.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.CheckList.Check.List.repository.TaskRepository;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {this.taskRepository = taskRepository;}

    public Task addTask(Task task){
        int lastPosition = taskRepository.getLastPosition();
        task.setPosition(lastPosition+1);
        return taskRepository.save(task);
    }

    public List<Task> findAllTasks(){
        return taskRepository.findAll(Sort.by(Sort.Direction.ASC, "position"));
    }

    public void deleteTask(Long id){
        int deletedPosition = taskRepository.getDeletedPosition(id);
        taskRepository.updatePositions(deletedPosition);
        taskRepository.deleteById(id);
    }

    public void finishTask(Long id) {
        Task newTask = taskRepository.findById(id).get();
        newTask.setStatus(!newTask.getStatus());
        taskRepository.save(newTask);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> filteredTasks(String[] priority, boolean status) { return taskRepository.filteredTasks(priority, status); }
    public List<Task> filteredTasks(String[] priority) { return taskRepository.filteredTasks(priority); }
}
