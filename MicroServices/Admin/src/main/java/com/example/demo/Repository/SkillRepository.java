package com.example.demo.Repository;

import com.example.demo.Models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillRepository extends JpaRepository<Skill,Integer> {
}
