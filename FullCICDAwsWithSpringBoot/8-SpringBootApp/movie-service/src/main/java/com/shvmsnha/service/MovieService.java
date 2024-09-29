package com.shvmsnha.service;

import java.util.List;

import org.springframework.stereotype.Service;
import com.shvmsnha.repository.MovieRepository;
import com.shvmsnha.domain.Genre;
import com.shvmsnha.dto.MovieDto;
import com.shvmsnha.mapper.EntityDtoMapper;

@Service
public class MovieService {

    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }


    public List<MovieDto> getAll() {
        return this.repository.findAll()
                .stream()
                .map(EntityDtoMapper::toDto)
                .toList();
    }

    public List<MovieDto> getAll(Genre genre) {
        return this.repository.findByGenre(genre)
                .stream()
                .map(EntityDtoMapper::toDto)
                .toList();
    }
}
