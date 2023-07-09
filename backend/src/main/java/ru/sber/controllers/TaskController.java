package ru.sber.controllers;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.sber.entities.*;
import ru.sber.services.PriorityService;
import ru.sber.services.RegularityService;
import ru.sber.services.StatusService;
import ru.sber.services.TaskService;

import java.net.URI;
import java.util.List;

/**
 * Контроллер для работы с задачами
 */
@Slf4j
@RestController
@RequestMapping("tasks")
public class TaskController {

    private final TaskService taskService;
    private final StatusService statusService;
    private final RegularityService regularityService;
    private final PriorityService priorityService;

    @Autowired
    public TaskController(TaskService taskService, StatusService statusService,
                          RegularityService regularityService, PriorityService priorityService) {
        this.taskService = taskService;
        this.statusService = statusService;
        this.regularityService = regularityService;
        this.priorityService = priorityService;
    }

    /**
     * Метод для добавления задачи.
     *
     * @param task Задача
     * @return Возвращает ответ о создании задачи
     */
    @PostMapping
    public ResponseEntity<?> addTask(@Valid @RequestBody Task task) {
        long taskId = taskService.createTask(task);
        if (taskId == -1) {
            return ResponseEntity.badRequest().body("Введена некорректная информация");
        }
        log.info("Добавление задачи {}", task);
        return ResponseEntity.created(URI.create("/tasks/" + taskId)).build();
    }

    /**
     * Метод для получения списка задач по идентификатору пользователя.
     *
     * @return Возвращает список задач
     */
    @GetMapping
    public List<AbridgedTask> getTasks() {
        log.info("Вывод всех задач");
        return taskService.findAll();
    }

    /**
     * Метод для получения списка задач по идентификатору категории.
     *
     * @param categoryId Идентификатор категории
     * @return Возвращает список задач
     */
    @GetMapping("/categories")
    public List<AbridgedTask> getTasksByCategory(@RequestParam long categoryId) {
        log.info("Вывод всех задач по категории");
        return taskService.findAllByCategoryId(categoryId);
    }

    /**
     * Метод для получения списка задач для уведомлений по идентификатору пользователя.
     *
     * @return Возвращает список задач
     */
    @GetMapping("/notifications")
    public List<AbridgedTask> getAllTasksForNotification() {
        log.info("Вывод всех задач, по которым нужно выслать уведомление");
        return taskService.isNotify();
    }

    /**
     * Метод для получения списка всех статусов задач.
     *
     * @return Возвращает список статусов
     */
    @GetMapping("/statuses")
    public List<Status> getStatuses() {
        log.info("Вывод всех возможных статусов");
        return statusService.findAll();
    }

    /**
     * Метод для получения списка всех приоритетов задач.
     *
     * @return Возвращает список приоритетов
     */
    @GetMapping("/priorities")
    public List<Priority> getPriorities() {
        log.info("Вывод всех возможных приоритетов");
        return priorityService.findAll();
    }

    /**
     * Метод для получения списка всех регулярностей задач.
     *
     * @return Возвращает список регулярности выполнения
     */
    @GetMapping("/regularities")
    public List<Regularity> getRegularities() {
        log.info("Вывод всех возможных приоритетов");
        return regularityService.findAll();
    }

    /**
     * Метод для обновления задачи.
     *
     * @param task Задача
     * @return Возвращает ответ об успешном выполнении или об ошибке
     */
    @PutMapping
    public ResponseEntity<?> updateTask(@Valid @RequestBody Task task) {

        boolean isUpdated = taskService.updateTask(task);

        if (isUpdated) {
            log.info("Обновление информации о задаче");
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    /**
     * Метод для удаления задачи по её идентификатору.
     *
     * @param taskId Идентификатор задачи
     * @return Возвращает ответ об успешном выполнении или об ошибке
     */
    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable long taskId) {

        boolean isDeleted = taskService.deleteTaskById(taskId);

        if (isDeleted) {
            log.info("Удаление задачи по id");
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
