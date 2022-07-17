package com.example.demo.Services;

import com.example.demo.Client.ProjectRepository;
import com.example.demo.Client.TaskRepository;
import com.example.demo.Models.DTO.ProjectTo;
import com.example.demo.Models.Project;
import com.example.demo.Models.Task;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectToService {
    private final ProjectRepository projectRepository;
    private final ProjectSkillToService projectSkillToService;
    public List<ProjectTo> getProjects(){
        List<Project> projects = projectRepository.findAll();

        List<ProjectTo> projectTos = projects.stream().map(project -> {
            ProjectTo projectTo = new ProjectTo();
            projectTo.setProjectName(project.getProjectName());
            projectTo.setAttachment(project.getAttachment());
            projectTo.setBids(project.getBids());
            projectTo.setId(project.getId());
            System.out.println(project.getStatus().getStatusName());
            projectTo.setStatus(project.getStatus());
            projectTo.setProjectDescription(project.getProjectDescription());
            projectTo.setProjectskills(projectSkillToService.toTransferObject(project.getProjectskills()));
            projectTo.setDuration(project.getDuration());
            projectTo.setMaxBudget(project.getMaxBudget());
            projectTo.setCompletionDate(project.getCompletionDate());
            projectTo.setMinBudget(project.getMinBudget());
            projectTo.setPostDate(project.getPostDate());
            projectTo.setTasks(project.getTasks());
            projectTo.setUser(project.getUser());
            projectTo.setSkillLevel(project.getSkillLevel());
            return  projectTo;
        }).collect(Collectors.toList());

        return projectTos;
    }

    public List<ProjectTo> displayByUser(Integer id) {
        List<Project> projects = projectRepository.findByUserId(id);

        List<ProjectTo> projectTos = projects.stream().map(project -> {
            ProjectTo projectTo = new ProjectTo();
            projectTo.setProjectName(project.getProjectName());
            projectTo.setAttachment(project.getAttachment());
            projectTo.setBids(project.getBids());
            projectTo.setId(project.getId());
            projectTo.setStatus(project.getStatus());
            projectTo.setProjectDescription(project.getProjectDescription());
            projectTo.setProjectskills(projectSkillToService.toTransferObject(project.getProjectskills()));
            projectTo.setDuration(project.getDuration());
            projectTo.setMaxBudget(project.getMaxBudget());
            projectTo.setCompletionDate(project.getCompletionDate());
            projectTo.setMinBudget(project.getMinBudget());
            projectTo.setPostDate(project.getPostDate());
            projectTo.setTasks(project.getTasks());
            projectTo.setUser(project.getUser());
            projectTo.setSkillLevel(project.getSkillLevel());
            return  projectTo;
        }).collect(Collectors.toList());

        return projectTos;
    }

    public ProjectTo getDataById(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project Not found!!!"));
        ProjectTo projectTo = new ProjectTo();
        projectTo.setProjectName(project.getProjectName());
        projectTo.setAttachment(project.getAttachment());
        projectTo.setBids(project.getBids());
        projectTo.setId(project.getId());
        projectTo.setProjectDescription(project.getProjectDescription());
        projectTo.setProjectskills(projectSkillToService.toTransferObject(project.getProjectskills()));
        projectTo.setDuration(project.getDuration());
        projectTo.setMaxBudget(project.getMaxBudget());
        projectTo.setCompletionDate(project.getCompletionDate());
        projectTo.setMinBudget(project.getMinBudget());
        projectTo.setPostDate(project.getPostDate());
        projectTo.setTasks(project.getTasks());
        projectTo.setUser(project.getUser());
        projectTo.setSkillLevel(project.getSkillLevel());
        projectTo.setStartDate(project.getStartDate());
        return  projectTo;
    }
}
