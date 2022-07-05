package com.example.demo.Client;

import com.example.demo.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value = "select * from task where project_id=?1", nativeQuery = true)
    List<Task> FindByProjectId(Integer id);

    @Query(value = "select count(*) from task where project_id=?1 ",nativeQuery = true)
    int isDividedIntoTaksOrNot(Integer id);
}
