package com.pragmatio.mojaepbih.model;

import lombok.Data;

@Data
public class SignUpData {
    private String email;
    private String username;
    private String password;
    private String passwordRepeated;
}
