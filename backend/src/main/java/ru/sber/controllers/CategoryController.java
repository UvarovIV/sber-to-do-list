package ru.sber.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.Category;
import ru.sber.services.CategoryService;

import java.net.URI;
import java.util.List;

/**
 * Контроллер для работы с категориями.
 */
@Slf4j
@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Метод для добавления категории.
     *
     * @param category Категория
     * @return Возвращает ответ о создании категории
     */
    @PostMapping
    public ResponseEntity<?> addCategory(@Valid @RequestBody Category category) {
        long idCategory = categoryService.createCategory(category);
        log.info("Добавление категории {}", category);
        return ResponseEntity.created(URI.create("/categories/" + idCategory)).build();
    }

    /**
     * Метод для получения списка категорий по идентификатору пользователя.
     *
     * @return Возвращает список категорий
     */
    @GetMapping()
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok().body(categoryService.findAll());
    }

    /**
     * Метод для обновления категории.
     *
     * @param category Категория
     * @return Возвращает ответ об успешном выполнении или об ошибке
     */
    @PutMapping
    public ResponseEntity<?> updateCategory(@Valid @RequestBody Category category) {
        boolean isUpdate = categoryService.updateCategory(category);
        if (isUpdate) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Метод для удаления категории по идентификатору.
     *
     * @param idCategory идентификатор категории
     * @return Возвращает ответ об успешном выполнении или об ошибке
     */
    @DeleteMapping
    public ResponseEntity<?> deleteCategory(@RequestParam long idCategory) {
        boolean isDelete = categoryService.deleteCategoryById(idCategory);
        if (isDelete) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
