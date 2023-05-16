package com.CheckList.Check.List.repository;

import com.CheckList.Check.List.model.Task;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = "SELECT * FROM task t WHERE t.priority IN (:priority) AND t.status = :status", nativeQuery = true)
    List<Task> filteredTasks(
            @Param("priority") String[] priority,
            @Param("status") boolean stats
    );

    @Query(value = "SELECT * FROM task t WHERE t.priority IN (:priority)", nativeQuery = true)
    List<Task> filteredTasks(
            @Param("priority") String[] priority
    );

    @Query(value = "SELECT max(position) FROM task", nativeQuery = true)
    int getLastPosition();

    @Query(value = "SELECT position FROM task WHERE id = :id", nativeQuery = true)
    int getDeletedPosition(
            @Param("id") Long id
    );

    @Transactional
    @Modifying
    @Query(value = "UPDATE task SET position=position-1 WHERE position > :deletedPosition", nativeQuery = true)
    int updatePositions(
            @Param("deletedPosition") int deletedPosition
    );

    @Query(value = "SELECT COUNT(*) FROM task", nativeQuery = true)
    int getCount();
}
