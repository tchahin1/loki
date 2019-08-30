package com.pragmatio.mojaepbih.hibernate.entity;

import javax.persistence.*;

@Entity
@Table(name = "failure")
public class Failure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "highTariff")
    private String description;

    @Lob
    @Column(name = "photo")
    private String photo;

    @ManyToOne
    private User user;

    public Failure() {

    }

    public Failure(String description, String photo, User user) {
        this.description = description;
        this.photo = photo;
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
