package ru.sber.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Статус повторяемости задачи
 */
@Entity
@Table (name = "regularities")
@Data
@NoArgsConstructor
public class Regularity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private ERegularity name;
}
