package com.pragmatio.mojaepbih.service.impl;

import com.pragmatio.mojaepbih.model.FailureDto;
import com.pragmatio.mojaepbih.model.entity.Failure;
import com.pragmatio.mojaepbih.model.entity.User;
import com.pragmatio.mojaepbih.repository.FailureRepository;
import com.pragmatio.mojaepbih.repository.UserRepository;
import com.pragmatio.mojaepbih.service.FailureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.Response;
import java.util.List;

@Service
public class FailureServiceImpl implements FailureService {

    private final FailureRepository failureRepository;
    private final UserRepository userRepository;

    @Autowired
    public FailureServiceImpl(FailureRepository failureRepository, UserRepository userRepository) {
        this.failureRepository = failureRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Failure save(Failure failure) {
        return failureRepository.save(failure);
    }

    @Override
    public Failure findById(Long id) {
        return failureRepository.getOne(id);
    }

    @Override
    public List<Failure> findAll() {
        return failureRepository.findAll();
    }

    @Override
    public void deleteAll() {
        failureRepository.deleteAll();
    }

    @Override
    public void deleteById(Long id) {
        failureRepository.deleteById(id);
    }

    @Override
    public Response saveFailureReport(FailureDto failureDto) {
        User user = null;
        if (!failureDto.getUsername().equals("")) user = userRepository.findByUsername(failureDto.getUsername());
        if (user == null && (!failureDto.getUsername().equals("")))
            return Response.status(400).entity("User does not exist!").build();
        Failure newFailure = new Failure(failureDto.getDescription(), failureDto.getPhoto(),
                user, failureDto.getLat(), failureDto.getLon());
        this.failureRepository.save(newFailure);
        return Response.ok().entity("Successfully added new failure report!").build();
    }

}
