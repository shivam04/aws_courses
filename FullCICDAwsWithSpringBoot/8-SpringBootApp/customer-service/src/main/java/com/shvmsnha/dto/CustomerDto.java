package com.shvmsnha.dto;

import java.util.List;

import com.shvmsnha.domain.Genre;

public record CustomerDto(Integer id,
                          String name,
                          Genre favoriteGenre,
                          List<MovieDto> recommendedMovies) {
}
