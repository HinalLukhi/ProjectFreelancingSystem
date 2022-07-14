package com.example.demo.Controlller;

import com.example.demo.Models.DTO.ProjectTo;
import com.example.demo.Models.Project;
import com.example.demo.Models.Projectskill;
import com.example.demo.Services.ProjectServices;
import com.example.demo.Services.ProjectToService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/project")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    public ProjectServices projectServices;

    @Autowired
    public ProjectToService projectToService;

    @PostMapping("/add")
    public int add(@RequestBody Project project)
    {
        return  projectServices.insert(project);
    }

    @GetMapping("/all")
    public List<ProjectTo> all(){ return projectToService.getProjects(); }

    @GetMapping("/{id}")
    public ProjectTo getDataById(@PathVariable Integer id){ return projectToService.getDataById(id); }

    @DeleteMapping("/{id}")
    public Boolean deleteProject(@PathVariable Integer id)
    {
        return projectServices.DeleteProject(id);
    }

    @PutMapping("/update/{id}")
    public Project updateProject(@RequestBody Project project,@PathVariable Integer id)
    {
        return projectServices.update(project,id);
    }

    @GetMapping("/user/{id}")
    public List<ProjectTo> getDataByUser(@PathVariable  Integer id){
        return projectToService.displayByUser(id);
    }

    @GetMapping("/activeprojects/{id}")
    public List<ProjectTo> getActiveproject(@PathVariable  Integer id){
        return projectServices.displayActiveProject(id);
    }

    @PostMapping("/addSkills")
    public List<Projectskill> addSkills(@RequestBody List<Projectskill> projectskill)
    {
        List<Projectskill> projectskillList= new ArrayList<>();
        for (Projectskill skill:projectskill) {
            projectskillList.add(projectServices.addSkills(skill));
        }
        return projectskillList;

    }

    @GetMapping("/skill/{id}")
    public List<Projectskill> getSkill(@PathVariable Integer id)
    {
        return projectServices.displayBidProjectId(id);
    }
}
