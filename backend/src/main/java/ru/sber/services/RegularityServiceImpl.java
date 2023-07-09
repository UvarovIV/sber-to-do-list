package ru.sber.services;

import org.springframework.stereotype.Service;
import ru.sber.entities.Regularity;
import ru.sber.repositories.RegularityRepository;

import java.util.List;

@Service
public class RegularityServiceImpl implements RegularityService {

    private final RegularityRepository regularityRepository;

    public RegularityServiceImpl(RegularityRepository regularityRepository) {
        this.regularityRepository = regularityRepository;
    }

    @Override
    public List<Regularity> findAll() {
        return regularityRepository.findAll();
    }
}
