package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "questions_and_complaints")
public class QuestionsAndComplaints {

    public QuestionsAndComplaints(String name, String legalName, String surname, String address, String code, String email, String phone, String request, Customer customer, Subsidiary subsidiary) {
        this.name = name;
        this.legalName = legalName;
        this.surname = surname;
        this.address = address;
        this.code = code;
        this.email = email;
        this.phone = phone;
        this.request = request;
        this.customer = customer;
        this.subsidiary = subsidiary;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "legal_name")
    private String legalName;

    @Column(name = "surname")
    private String surname;

    @Column(name = "address")
    private String address;

    @Column(name = "code")
    private String code;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "request")
    private String request;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private Subsidiary subsidiary;
}
