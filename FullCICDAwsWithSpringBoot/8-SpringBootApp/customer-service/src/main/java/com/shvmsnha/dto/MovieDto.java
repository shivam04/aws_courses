package com.shvmsnha.dto;

import com.shvmsnha.domain.Genre;

public record MovieDto(Integer id,
                       String title,
                       Integer releaseYear,
                       Genre genre) {
}
