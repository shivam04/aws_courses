package com.shvmsnha.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shvmsnha.entity.Movie;
import com.shvmsnha.domain.Genre;


@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    List<Movie> findByGenre(Genre genre);
    
}
