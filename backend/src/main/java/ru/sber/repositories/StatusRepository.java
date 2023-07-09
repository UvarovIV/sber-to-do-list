package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Status;

/**
 * Хранилище данных о статусах задач
 */
@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
}
