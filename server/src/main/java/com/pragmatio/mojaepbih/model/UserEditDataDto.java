package com.pragmatio.mojaepbih.model;

import lombok.Value;

@Value
public class UserEditDataDto {
    String name;
    String surname;
    String email;
    String password;
    Long id;
}
