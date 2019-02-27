DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	username VARCHAR(255),
	password VARCHAR(255)
);
INSERT INTO users VALUES(0, 'rakatashi', 'password');
INSERT INTO users VALUES(1, 'billsagger@42.net', 'sjdb2is9');
INSERT INTO users VALUES(2, 'stevenash', 'password');
INSERT INTO users VALUES(3, 'JayKelly', 'password5');
INSERT INTO users VALUES(4, 'JDoss42', 'password6');