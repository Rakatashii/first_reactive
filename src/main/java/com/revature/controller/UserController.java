package com.revature.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.revature.dao.UserDAOI;
import com.revature.entity.User;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserController {
	@Autowired UserDAOI userDAO;
	@PostMapping(name="/authenticate")
	public User authenticate(@RequestParam User credentials) {
		User user = userDAO.getByEmail(credentials.getEmail());
		if (user == null) 
			return credentials;
		else if (userDAO.findByEmail(user.getEmail()) && userDAO.findByPassword(user.getPassword()))
				return user;
		else return credentials;
	}
}
