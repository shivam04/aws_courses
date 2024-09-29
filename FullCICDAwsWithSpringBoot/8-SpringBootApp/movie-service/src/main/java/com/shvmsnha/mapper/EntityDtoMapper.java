package com.shvmsnha.mapper;

import com.shvmsnha.dto.MovieDto;
import com.shvmsnha.entity.Movie;

public class EntityDtoMapper {
    
    public static MovieDto toDto(Movie movie) {
        return new MovieDto(movie.getId(), 
                        movie.getTitle(),
                        movie.getReleaseYear(), 
                        movie.getGenre());
    }
}
