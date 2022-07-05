package com.example.demo.Services;

import com.example.demo.Client.TaskRepository;
import com.example.demo.Models.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServices {

    @Autowired
    TaskRepository taskRepository;

    public Task insertData(Task task)
    {
        return taskRepository.save(task);
    }

    public List<Task> all(){return taskRepository.findAll();}

    public Optional<Task> getDataById(Integer id) { return taskRepository.findById(id);}

    public Boolean DeleteTask(Integer id){
        taskRepository.deleteById(id);
        if(taskRepository.findById(id)!=null)
        {
            return false;
        }
        return true;
    }

    public Task update(Task task, Integer id)
    {
        if(taskRepository.existsById(id)){
            Optional<Task> task1 = taskRepository.findById(id);;
            task.setId(id);
            return taskRepository.save(task);
        } else {
            return null;
        }
    }

    public List<Task> DisplayByProjectID(Integer id)
    {
        return taskRepository.FindByProjectId(id);
    }

    public  int isDividedIntoTaksOrNot(Integer id)
    {
        return taskRepository.isDividedIntoTaksOrNot(id);
    }
}
