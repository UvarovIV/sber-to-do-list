package ru.sber.services;

import org.springframework.stereotype.Service;
import ru.sber.entities.Priority;
import ru.sber.repositories.PriorityRepository;

import java.util.List;
/**
 * Сервис для взаимодействия с приоритетами задач
 */
@Service
public class PriorityServiceImpl implements PriorityService {

    private final PriorityRepository priorityRepository;

    public PriorityServiceImpl(PriorityRepository priorityRepository) {
        this.priorityRepository = priorityRepository;
    }

    @Override
    public List<Priority> findAll() {
        return priorityRepository.findAll();
    }
}
