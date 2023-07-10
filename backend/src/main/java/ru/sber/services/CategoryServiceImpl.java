package ru.sber.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import ru.sber.entities.Category;
import ru.sber.entities.User;
import ru.sber.repositories.CategoryRepository;
import ru.sber.security.services.UserDetailsImpl;

import java.util.List;
/**
 * Сервис для взаимодействия с категориями задач
 */
@Service
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Long createCategory(Category category) {
        long userId = getUserIdFromSecurityContext();
        category.setUser(new User(userId));
        return categoryRepository.save(category).getId();
    }

    @Override
    public List<Category> findAll() {
        long userId = getUserIdFromSecurityContext();
        return categoryRepository.findAllByUser_Id(userId);
    }

    @Override
    public boolean updateCategory(Category category) {
        long userId = getUserIdFromSecurityContext();
        if (categoryRepository.existsByIdAndUser_Id(category.getId(), userId)) {
            category.setUser(new User(userId));
            categoryRepository.save(category);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteCategoryById(long categoryId) {
        long userId = getUserIdFromSecurityContext();
        if (categoryRepository.existsByIdAndUser_Id(categoryId, userId)) {
            categoryRepository.deleteById(categoryId);
            return true;
        }

        return false;
    }

    @Override
    public boolean checkExistence(long categoryId) {
        long userId = getUserIdFromSecurityContext();
        return categoryRepository.existsByIdAndUser_Id(categoryId, userId);
    }

    private long getUserIdFromSecurityContext() {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return ((UserDetailsImpl)principal).getId();
        } else {
            //return 1;
            throw new RuntimeException("Пользователь не найден");
        }

    }
}
