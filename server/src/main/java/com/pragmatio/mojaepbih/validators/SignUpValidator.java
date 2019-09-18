package com.pragmatio.mojaepbih.validators;

import com.pragmatio.mojaepbih.model.SignUpData;

import static com.pragmatio.mojaepbih.validators.UserValidator.*;

public class SignUpValidator {
    public static boolean validateSignUpData(SignUpData signUpData) {
        return validateUsername(signUpData.getUsername())
                && validatePassword(signUpData.getPassword())
                && validateEmail(signUpData.getEmail())
                && validateRepeatPassword(signUpData.getPassword(), signUpData.getPasswordRepeated());
    }
}
