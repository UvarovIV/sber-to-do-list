package ru.sber.services;

import ru.sber.entities.AbridgedTask;
import ru.sber.entities.Task;

import java.util.List;
/**
 * Сервис для взаимодействия с задачами
 */
public interface TaskService {

    /**
     * Создает новую задачу
     *
     * @param task задача для создания
     * @return Возвращает идентификатор созданной задачи
     */
    Long createTask(Task task);

    /**
     * Ищет список задач пользователя
     *
     * @param userId Уникальный идентификатор пользователя
     * @return Возвращает список задач пользователя
     */
    List<AbridgedTask> findAll(long userId);

    /**
     * Ищет задачи, для которых требуется уведомление.
     *
     * @param userId Уникальный идентификатор пользователя
     * @return Возвращает список задач пользователя, которым требуется уведомление
     */
    List<AbridgedTask> isNotify(long userId);

    /**
     * Ищет все задачи по категории
     *
     * @param categoryId Идентификатор категории
     * @return Возвращает список задач, относящихся к определенной категории.
     */
    List<AbridgedTask> findAllByCategoryId(long categoryId);

    /**
     * Обновляет данные о задаче
     *
     * @param task Обновленнная задача
     * @return Возвращает статус обновления
     */
    boolean updateTask(Task task);

    /**
     * Удаляет задачу
     *
     * @param taskId Идентификатор задачи
     * @return Возвращает статус удаления
     */
    boolean deleteTaskById(long taskId);
}
