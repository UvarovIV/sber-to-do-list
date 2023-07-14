package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.Category;

import java.util.List;
import java.util.Optional;

/**
 * Хранилище данных о категориях
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    /**
     * Ищет в БД все категории пользователя
     *
     * @param userId Уникальный идентификатор пользователя
     * @return Возвращает список всех категорий определенного пользователя
     */
    List<Category> findAllByUser_Id(long userId);
    Boolean existsByIdAndUser_Id(long cartId, long userId);
}
