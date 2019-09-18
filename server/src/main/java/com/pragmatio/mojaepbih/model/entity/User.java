package com.pragmatio.mojaepbih.model.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"email"
		})
})
public class User implements Serializable{

	public User(String email, String username, String password) {
		super();
		this.email = email;
		this.username = username;
		this.password = password;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "username")
	private String username;

	@Column(name = "password")
	private String password;

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", email=" + email + "]";
	}

}
