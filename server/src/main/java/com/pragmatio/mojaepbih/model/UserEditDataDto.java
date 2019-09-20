package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class UserEditDataDto {
    String name;
    String surname;
    String email;
    String password;
    Long id;
}
