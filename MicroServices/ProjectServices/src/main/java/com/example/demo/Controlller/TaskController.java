package com.example.demo.Controlller;

import com.example.demo.Models.Task;
import com.example.demo.Services.TaskServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    public TaskServices taskServices;

    @PostMapping("/add")
    public List<Task> add(@RequestBody List<Task> tasks)
    {
        List<Task> taskList =tasks.stream().map(task ->taskServices.insertData(task)).collect(Collectors.toList());
        return  taskList;
    }

    @GetMapping("/all")
    public List<Task> all(){ return taskServices.all();}

    @GetMapping("/{id}")
    public Task getDataById(@PathVariable Integer id){ return taskServices.getDataById(id).get(); }

    @DeleteMapping("/{id}")
    public Boolean deleteTask(@PathVariable Integer id)
    {
        return taskServices.DeleteTask(id);
    }

    @PutMapping("/update/{id}")
    public Task updateTask(@RequestBody Task task,@PathVariable Integer id)
    {
        return taskServices.update(task,id);
    }

    @GetMapping("/project/{id}")
    public List<Task> getDataByProject(@PathVariable  Integer id){
        return taskServices.DisplayByProjectID(id);
    }

    @GetMapping("/checkprojecttask/{id}")
    public int isDividedIntoTaksOrNot(@PathVariable Integer id){
        return taskServices.isDividedIntoTaksOrNot(id);
    }
}
