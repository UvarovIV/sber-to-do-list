package ru.sber.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ru.sber.entities.AbridgedTask;
import ru.sber.entities.Category;
import ru.sber.entities.Task;
import ru.sber.repositories.TaskRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Сервис для взаимодействия с задачами
 */
@Slf4j
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

    public TaskServiceImpl(TaskRepository taskRepository, CategoryService categoryService) {
        this.taskRepository = taskRepository;
        this.categoryService = categoryService;
    }

    @Override
    public Long createTask(Task task) {
        boolean categoryIsRight = categoryService.checkExistence(task.getCategory().getId());
        if (categoryIsRight) {
            return taskRepository.save(task).getId();
        }
        return -1L;
    }

    @Override
    public List<AbridgedTask> findAll() {
        List<Category> categories = categoryService.findAll();
        return categories.stream()
                .flatMap(category -> findAllByCategoryId(category.getId()).stream())
                .toList();
    }

    @Override
    public List<AbridgedTask> isNotify() {
        return categoryService.findAll()
                .stream()
                .flatMap(category ->
                        taskRepository.findAllByCategory_Id(category.getId())
                                .stream()
                                .filter(TaskServiceImpl::isNotify)
                                .map(AbridgedTask::new))
                .toList();
    }

    private static boolean isNotify(Task task) {
        LocalDateTime nowTime = LocalDateTime.now();
        LocalDateTime taskTime = task.getDate();
        if (taskTime == null) {
            return false;
        }
        boolean isYearMatched = taskTime.getYear() == nowTime.getYear();
        boolean isMonthMatched = taskTime.getMonth() == nowTime.getMonth();
        boolean isDayMatched = taskTime.getDayOfMonth() == nowTime.getDayOfMonth();
        long diffTime = taskTime.getHour() * 60 + taskTime.getMinute()
                - (nowTime.getHour() * 60 + nowTime.getMinute());
        return isYearMatched && isMonthMatched && isDayMatched && diffTime < 20 && diffTime >= 0;
    }

    @Override
    public List<AbridgedTask> findAllByCategoryId(long categoryId) {
        boolean categoryIsExist = categoryService.checkExistence(categoryId);
        List<Task> tasks = new ArrayList<>();
        if (categoryIsExist) {
            tasks = taskRepository.findAllByCategory_Id(categoryId);
        }
        return tasks.stream()
                .map(AbridgedTask::new)
                .toList();
    }

    @Override
    public boolean updateTask(Task task) {
        boolean taskExist = taskRepository.existsById(task.getId());

        if (taskExist) {
            taskRepository.save(task);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteTaskById(long taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        if (task.isPresent() &&
                categoryService.checkExistence(task.get().getCategory().getId())) {
            taskRepository.deleteById(taskId);
            return true;
        }
        return false;
    }
}
