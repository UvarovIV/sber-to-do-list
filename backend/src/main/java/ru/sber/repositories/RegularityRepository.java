package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Regularity;

/**
 * Хранилище данных о возможных вариантах повторения задач
 */
@Repository
public interface RegularityRepository extends JpaRepository<Regularity, Long> {
}
