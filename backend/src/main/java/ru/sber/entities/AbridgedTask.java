package ru.sber.entities;

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
    LocalDateTime dateAndTimeOfTask;
    Status status;
    Priority priority;
    Regularity regularity;

    public AbridgedTask(Task task) {
        this.id = task.getId();
        this.title = task.title;
        this.description = task.description;
        this.dateAndTimeOfTask = task.dateAndTimeOfTask;
        this.status = task.status;
        this.priority = task.priority;
        this.regularity = task.regularity;
    }
}
