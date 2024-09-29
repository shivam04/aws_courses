package com.shvmsnha.client;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.shvmsnha.domain.Genre;
import com.shvmsnha.dto.MovieDto;

@Service
public class MovieClient {

    private static final Logger log = LoggerFactory.getLogger(MovieClient.class);
    private final RestClient client;

    public MovieClient(RestClient client) {
        this.client = client;
    }

    public List<MovieDto> getMovies(Genre genre) {
        log.info("genre: {}", genre);
        var list = this.client.get()
                              .uri("/api/movies/{genre}", genre)
                              .retrieve()
                              .body(new ParameterizedTypeReference<List<MovieDto>>() {
                              });
        log.info("received movies: {}", list);
        return list;
    }

}
