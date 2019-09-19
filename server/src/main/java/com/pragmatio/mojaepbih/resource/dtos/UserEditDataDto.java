package com.pragmatio.mojaepbih.resource.dtos;

public class UserEditDataDto {
    String name;
    String surname;
    String email;
    String password;
    String confirmPass;
    String id;

    public UserEditDataDto(String name, String surname, String email, String password, String confirmPass, String id) {
        this.setName(name);
        this.setSurname(surname);
        this.setEmail(email);
        this.setPassword(password);
        this.setConfirmPass(confirmPass);
        this.setId(id);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPass() {
        return confirmPass;
    }

    public void setConfirmPass(String confirmPass) {
        this.confirmPass = confirmPass;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
