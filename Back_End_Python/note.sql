/* Delete User Table */
DROP TABLE message_table; 
DROP TABLE user_table; 

/* Create User Table */
CREATE TABLE user_table (
  user_id SERIAL NOT NULL PRIMARY KEY,
  user_name VARCHAR(30) UNIQUE NOT NULL,
  user_password VARCHAR(30) NOT NULL,
  user_email VARCHAR(255) UNIQUE NULL,
  created_date TIMESTAMP
);

/* Populate User Table */
INSERT INTO user_table (user_id, user_name, user_password, user_email, created_date) 
VALUES  (0, 'admin', 'admin', 'admin@admin.com', CURRENT_TIMESTAMP),
        (1, 'admin2', 'admin', NULL, CURRENT_TIMESTAMP),
        (2, 'kurosuha', 'kurosuha', NULL,CURRENT_TIMESTAMP),
        (3, 'user2', 'password', NULL, CURRENT_TIMESTAMP),
        (DEFAULT, 'user4', 'password', 'user4@user.com', CURRENT_TIMESTAMP),
        (DEFAULT, 'user5', 'password', 'user5@user.com', CURRENT_TIMESTAMP),
        (DEFAULT, 'user6', 'password', 'user6@user.com', CURRENT_TIMESTAMP),
        (DEFAULT, 'user7', 'password', 'user7@user.com', CURRENT_TIMESTAMP),
        (DEFAULT, 'user8', 'password', 'user8@user.com', CURRENT_TIMESTAMP);


/* Create Message Table */
CREATE TABLE message_table (
  message_id SERIAL NOT NULL,
  user_id INT NOT NULL,
  chatroom_id INT NOT NULL,
  message_text VARCHAR NULL,
  created_date TIMESTAMP NULL,
  PRIMARY KEY (message_id),
  FOREIGN KEY (user_id) REFERENCES user_table (user_id),
  FOREIGN KEY (chatroom_id) REFERENCES chatroom_table (chatroom_id)
);

/* Populate Message Table */
INSERT INTO message_table (message_id, user_id, chatroom_id, message_text, created_date)
VALUES      (DEFAULT, 0, 0, 'Hello World', CURRENT_TIMESTAMP),
            (DEFAULT, 0, 0, 'Testing', CURRENT_TIMESTAMP),
            (DEFAULT, 0, 1, 'Hello World', CURRENT_TIMESTAMP),
            (DEFAULT, 1, 1, 'Hello Room 2', CURRENT_TIMESTAMP),
            (DEFAULT, 1, 1, 'Hello World', CURRENT_TIMESTAMP);













/* Insert a new Chatroom */
INSERT INTO chatroom_table (chatroom_id, name, created_date) VALUES (DEFAULT, 'room_name', CURRENT_TIMESTAMP);

INSERT INTO user_table (user_id, user_name, user_password, created_date) VALUES (DEFAULT, 'user2', 'user2', CURRENT_TIMESTAMP);

SELECT * FROM user_table;
