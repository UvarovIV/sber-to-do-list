package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Priority;

/**
 * Хранилище данных о приорететах для задач
 */
@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
}
