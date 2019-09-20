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

	public User(String email, String name, String surname, String password) {
		super();
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
	}

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "email", nullable = false, unique = true)
	private String email;

	@Column(name = "name")
	private String name;

	@Column(name = "surname")
	private String surname;

	@Column(name = "password")
	private String password;

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + "]";
	}

}
