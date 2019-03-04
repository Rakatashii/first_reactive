package com.revature.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="users")
public class User {
	@Id
	public int id;
	@Column(name="email")
	public String email;
	@Column(name="password")
	public String password;
	@Column(name="enabled")
	public boolean enabled;
	public User(int id, String email, String password, boolean enabled) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.enabled = enabled;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	@Override
	public String toString() {
		return "User [id=" + id 
				+ ", email=" + ((email != null) ? email : null)
				+ ", password=" + ((password != null) ? password : null) 
				+ ", enabled=" + enabled + "]";
	}
}
