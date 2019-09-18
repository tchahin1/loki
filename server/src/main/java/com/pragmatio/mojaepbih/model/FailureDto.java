package com.pragmatio.mojaepbih.model;

import lombok.Value;

@Value
public class FailureDto {
    String photo;
    String username;
    String description;
    Double lat;
    Double lon;
}
