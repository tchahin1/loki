package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {

    public Notification(String deviceToken, User user) {
        this.deviceToken = deviceToken;
        this.user = user;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "device_token")
    private String deviceToken;

    @OneToOne
    private User user;
}
