package com.pragmatio.mojaepbih.model;

import lombok.Data;


@Data
public class FailureDto {
    String photo;
    String email;
    String description;
    Double lat;
    Double lon;
}
