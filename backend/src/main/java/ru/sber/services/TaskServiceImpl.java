package ru.sber.services;

import org.springframework.stereotype.Service;
import ru.sber.entities.AbridgedTask;
import ru.sber.entities.Category;
import ru.sber.entities.Task;
import ru.sber.repositories.TaskRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
/**
 * Сервис для взаимодействия с задачами
 */
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
        return taskRepository.save(task).getId();
    }

    @Override
    public List<AbridgedTask> findAll(long userId) {
        List<Category> categories = categoryService.findAllByUserId(userId);
        if (categories.isEmpty()) {
            return List.of();
        } else {
            List<AbridgedTask> taskList = new ArrayList<>();
            for (Category category: categories) {
                taskList.addAll(findAllByCategoryId(category.getId()));
            }
            return taskList;
        }
    }

    @Override
    public List<AbridgedTask> isNotify(long userId) {
        return categoryService.findAllByUserId(userId)
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
        boolean isYearMatched = task.getDateAndTimeOfTask().getYear() == nowTime.getYear();
        boolean isMonthMatched = task.getDateAndTimeOfTask().getMonth() == nowTime.getMonth();
        boolean isDayMatched  = task.getDateAndTimeOfTask().getDayOfMonth() == nowTime.getDayOfMonth();
        long diffTime = task.getDateAndTimeOfTask().getHour() * 60 + task.getDateAndTimeOfTask().getMinute()
                - (nowTime.getHour() * 60 + nowTime.getMinute());
        return isYearMatched && isMonthMatched && isDayMatched && diffTime < 20 && diffTime >= 0;
    }

    @Override
    public List<AbridgedTask> findAllByCategoryId(long categoryId) {
        return taskRepository.findAllByCategory_Id(categoryId)
                .stream()
                .map(AbridgedTask::new)
                .toList();
    }

    @Override
    public boolean updateTask(Task task) {
        if (taskRepository.existsById(task.getId())) {
            taskRepository.save(task);
            return true;
        }

        return false;
    }

    @Override
    public boolean deleteTaskById(long taskId) {
        taskRepository.deleteById(taskId);
        return true;
    }
}
