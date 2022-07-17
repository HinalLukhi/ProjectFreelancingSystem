package com.example.demo.Services.transformers;

import com.example.demo.Models.DTO.ProjectTo;
import com.example.demo.Models.Project;
import com.example.demo.Services.ProjectSkillToService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ProjectTransformer {

    private final ProjectSkillToService projectSkillToService;

    public ProjectTo toTransferObject(Project project){
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
