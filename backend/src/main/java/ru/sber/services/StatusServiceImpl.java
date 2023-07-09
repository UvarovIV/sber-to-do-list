package ru.sber.services;

import org.springframework.stereotype.Service;
import ru.sber.entities.Status;
import ru.sber.repositories.StatusRepository;

import java.util.List;

/**
 * Сервис для взаимодействия со статусами задач
 */
@Service
public class StatusServiceImpl implements StatusService {

    private final StatusRepository statusRepository;

    public StatusServiceImpl(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    @Override
    public List<Status> findAll() {
        return statusRepository.findAll();
    }
}
