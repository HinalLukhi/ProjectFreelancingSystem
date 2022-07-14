package com.example.demo.Client;

import com.example.demo.Models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value = "select * from task where project_id=?1", nativeQuery = true)
    List<Task> FindByProjectId(Integer id);

    @Query(value = "select count(*) from task where project_id=?1 ",nativeQuery = true)
    int isDividedIntoTaksOrNot(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update task set status_id=1 where task_id=?1",nativeQuery = true)
    int updateStatusTOComplete(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update task set status_id=5 where task_id=?1",nativeQuery = true)
    int updateStatusTOActive(Integer id);
}
