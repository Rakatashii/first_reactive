package com.revature.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.revature.entity.User;

public interface UserDAOI extends JpaRepository<User, Integer>{
	public boolean findByEmail(String email);
	public boolean findByPassword(String password);
	public User getByEmail(String email);
}
