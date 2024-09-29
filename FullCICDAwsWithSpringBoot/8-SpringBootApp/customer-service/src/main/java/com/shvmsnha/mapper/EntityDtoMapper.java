package com.shvmsnha.mapper;

import java.util.List;

import com.shvmsnha.dto.CustomerDto;
import com.shvmsnha.dto.MovieDto;
import com.shvmsnha.entity.Customer;

public class EntityDtoMapper {

    public static CustomerDto toDto(Customer customer, List<MovieDto> movies){
        return new CustomerDto(
                customer.getId(),
                customer.getName(),
                customer.getFavoriteGenre(),
                movies
        );
    }

}
