package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.entity.Customer;
import com.pragmatio.mojaepbih.repository.CustomerRepository;
import com.pragmatio.mojaepbih.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }

    @Override
    public Customer findById(Long id) {
        return customerRepository.getOne(id);
    }

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public void deleteAll() {
        customerRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        customerRepository.deleteById(id);
    }

}
