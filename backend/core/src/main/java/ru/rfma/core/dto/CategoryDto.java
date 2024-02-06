package ru.rfma.core.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryDto {
    private int id;
    private String name;
    private float spendLimit;
    private int userId;
}
