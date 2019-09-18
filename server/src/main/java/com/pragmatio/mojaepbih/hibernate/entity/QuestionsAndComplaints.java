package com.pragmatio.mojaepbih.hibernate.entity;

import javax.persistence.*;

@Entity
@Table(name = "questions_and_complaints")
public class QuestionsAndComplaints {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

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

    public QuestionsAndComplaints() {
    }

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

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLegalName() {
        return legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Subsidiary getSubsidiary() {
        return subsidiary;
    }

    public void setSubsidiary(Subsidiary subsidiary) {
        this.subsidiary = subsidiary;
    }
}
