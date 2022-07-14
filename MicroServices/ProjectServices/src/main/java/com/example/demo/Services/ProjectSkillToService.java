package com.example.demo.Services;

import com.example.demo.Models.DTO.ProjectSkillTo;
import com.example.demo.Models.Projectskill;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProjectSkillToService {

    public Set<ProjectSkillTo> toTransferObject(Set<Projectskill> projectSkills){
        Set<ProjectSkillTo> projectSkillTos = new LinkedHashSet<>();
        for (Projectskill skill:
             projectSkills) {
            ProjectSkillTo skillTo = new ProjectSkillTo();
            skillTo.setName(skill.getSkill().getSkillName());
            skillTo.setId(skill.getSkill().getId());
            projectSkillTos.add(skillTo);
        }

        return projectSkillTos;
    }

}
