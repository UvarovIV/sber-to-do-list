package ru.sber.services;

import ru.sber.entities.Category;

import java.util.List;

/**
 * Сервис для взаимодействия с категориями задач
 */
public interface CategoryService {
    /**
     * Создает новую категорию
     *
     * @param category Категория задачи
     * @return Возвращает id созданной задачи
     */
    Long createCategory(Category category);

    /**
     * Ищет все категории пользователя
     *
     * @return Возвращает список найденных категорий
     */
    List<Category> findAll();

    /**
     * Обновляет информацию о категории
     *
     * @param category Обновленная категория задачи
     * @return Возвращает статус обновления
     */
    boolean updateCategory(Category category);

    /**
     * Удаляет категорию
     *
     * @param categoryId Идентификатор категории
     * @return Возвращает статус удаления
     */
    boolean deleteCategoryById(long categoryId);

    boolean checkExistence(long categoryId);

}
