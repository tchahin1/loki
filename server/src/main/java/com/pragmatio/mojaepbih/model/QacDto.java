package com.pragmatio.mojaepbih.model;

import lombok.Value;

@Value
public class QacDto {
    String name;
    String legalName;
    String surname;
    String address;
    String code;
    String phone;
    String email;
    String request;
    Integer customerType;
    Integer subsidiaryId;
}
