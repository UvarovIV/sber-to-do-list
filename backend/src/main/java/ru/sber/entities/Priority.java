package ru.sber.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Приоритет задачи
 */
@Entity
@Table(name = "priorities")
@Data
@NoArgsConstructor
public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private EPriority name;
}
