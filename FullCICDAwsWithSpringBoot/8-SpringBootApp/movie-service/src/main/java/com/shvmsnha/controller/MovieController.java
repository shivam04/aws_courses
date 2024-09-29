package com.shvmsnha.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shvmsnha.domain.Genre;
import com.shvmsnha.dto.MovieDto;
import com.shvmsnha.service.MovieService;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/movies")
public class MovieController {
    
    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    @GetMapping
    public List<MovieDto> getAll() {
        return service.getAll();
    }

    @GetMapping("{genre}")
    public List<MovieDto> getAllByGenre(@PathVariable Genre genre) {
        return service.getAll(genre);
    }
}
