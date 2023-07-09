package ru.sber.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.sber.entities.User;

import java.util.Optional;

/**
 * Хранилище с данными о пользователях
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Ищет пользователя по логину
     *
     * @param username Указанный логин
     * @return Возвращает найденного пользователя
     */
    Optional<User> findByUsername(String username);

    /**
     * Проверяет, существует ли в БД указанный username
     *
     * @param username Указанный логин
     * @return Возвращает статус проверки
     */
    Boolean existsByUsername(String username);

    /**
     * Проверяет, существует ли в БД указанный email
     *
     * @param email Указанная электронная почта
     * @return Возвращает статус проверки
     */
    Boolean existsByEmail(String email);

}
