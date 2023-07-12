package ru.sber.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Задача с уменьшенным количеством информации
 */
@Data
public class AbridgedTask {
    private final Long id;
    String title;
    String description;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    LocalDateTime dateAndTimeOfTask;
    Status status;
    Priority priority;
    Regularity regularity;
    String categoryName;
    Long categoryId;

    public AbridgedTask(Task task) {
        this.id = task.getId();
        this.title = task.title;
        this.description = task.description;
        this.dateAndTimeOfTask = task.dateAndTimeOfTask;
        this.status = task.status;
        this.priority = task.priority;
        this.regularity = task.regularity;
        this.categoryName = task.category.getName();
        this.categoryId = task.category.getId();
    }
}
