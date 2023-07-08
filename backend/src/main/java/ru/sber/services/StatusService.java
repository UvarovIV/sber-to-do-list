package ru.sber.services;

import ru.sber.entities.Status;

import java.util.List;

/**
 * Сервис для взаимодействия со статусами задач
 */
public interface StatusService {

    /**
     * Ищет все статусы задач
     *
     * @return Возвращает список найденных статусов
     */
    List<Status> findAll();

}
