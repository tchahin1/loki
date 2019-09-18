package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "failure")
public class Failure {

    public Failure(String description, String photo, User user, Double lat, Double lon) {
        this.setDescription(description);
        this.setPhoto(photo);
        this.setUser(user);
        this.setLat(lat);
        this.setLon(lon);
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "highTariff")
    private String description;

    @Column(name = "latitude")
    private Double lat;

    @Column(name = "longitude")
    private Double lon;

    @Lob
    @Column(name = "photo")
    private String photo;

    @ManyToOne(optional = true, fetch = FetchType.LAZY)
    private User user;
}
