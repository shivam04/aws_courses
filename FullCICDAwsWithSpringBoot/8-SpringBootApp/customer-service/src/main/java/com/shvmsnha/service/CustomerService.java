package com.shvmsnha.service;

import org.springframework.stereotype.Service;

import com.shvmsnha.client.MovieClient;
import com.shvmsnha.dto.CustomerDto;
import com.shvmsnha.dto.GenreUpdateRequest;
import com.shvmsnha.exceptions.CustomerNotFoundException;
import com.shvmsnha.mapper.EntityDtoMapper;
import com.shvmsnha.repository.CustomerRepository;

@Service
public class CustomerService {

    private final MovieClient movieClient;
    private final CustomerRepository repository;

    public CustomerService(MovieClient movieClient, CustomerRepository repository) {
        this.movieClient = movieClient;
        this.repository = repository;
    }

    public CustomerDto getCustomer(Integer id) {
        var customer = this.repository.findById(id)
                                      .orElseThrow(() -> new CustomerNotFoundException(id));
        var movies = this.movieClient.getMovies(customer.getFavoriteGenre());
        return EntityDtoMapper.toDto(customer, movies);
    }

    public void updateCustomerGenre(Integer id, GenreUpdateRequest request) {
        var customer = this.repository.findById(id)
                                      .orElseThrow(() -> new CustomerNotFoundException(id));
        customer.setFavoriteGenre(request.favoriteGenre());
        this.repository.save(customer);
    }

}
