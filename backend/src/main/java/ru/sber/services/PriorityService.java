package ru.sber.services;

import ru.sber.entities.Priority;

import java.util.List;

/**
 * Сервис для взаимодействия с приоритетами задач
 */
public interface PriorityService {

    /**
     * Ищет все приоритеты задач
     *
     * @return Возвращает список найденных приоритетов
     */
    List<Priority> findAll();

}
