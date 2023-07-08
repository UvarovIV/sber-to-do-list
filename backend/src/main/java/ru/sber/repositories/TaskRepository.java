package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Task;

import java.util.List;

/**
 * Хранилище данных о задачах
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    /**
     * Ищет все задачи по статусу
     *
     * @param id Статус задачи
     * @return Возвращает список найденных задач
     */
    List<Task> findAllByStatus_Id(Integer id);

    /**
     * Ищет все задачи по категории
     *
     * @param id Категория задачи
     * @return Возвращает список найденных задач
     */
    List<Task> findAllByCategory_Id(Long id);

    /**
     * Ищет все задачи по приоритету
     *
     * @param id Приоритет задачи
     * @return Возвращает список найденных задач
     */
    List<Task> findAllByPriority_Id(Integer id);
}
