/* Delete User Table */
DROP TABLE message_table; 
DROP TABLE user_table; 
DROP TABLE chatroom_table; 

/* Create User Table */
CREATE TABLE user_table (
  user_id SERIAL NOT NULL PRIMARY KEY,
  user_name VARCHAR(30) UNIQUE NOT NULL,
  user_password VARCHAR(30) NOT NULL,
  user_email VARCHAR(255) UNIQUE NULL,
  created_date TIMESTAMP
);

/* Create Chatroom Table */
CREATE TABLE chatroom_table (
  chatroom_id SERIAL NOT NULL PRIMARY KEY,
  chatroom_name VARCHAR(30) UNIQUE NOT NULL,
  created_date TIMESTAMP
);

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

/* Repopulate Tables */
INSERT INTO user_table (user_id, user_name, user_password, user_email, created_date) 
VALUES  (DEFAULT, 'admin', 'admin', 'admin@admin.com', CURRENT_TIMESTAMP),
        (DEFAULT, 'test', 'test', 'test@admin.com', CURRENT_TIMESTAMP);

INSERT INTO chatroom_table (chatroom_id, chatroom_name, created_date) 
VALUES  (DEFAULT, 'admin', CURRENT_TIMESTAMP),
        (DEFAULT, 'HelloWorld', CURRENT_TIMESTAMP);

INSERT INTO message_table (message_id, user_id, chatroom_id, message_text, created_date)
VALUES  (DEFAULT, 1, 1, 'Hello World - Room Admin', CURRENT_TIMESTAMP),
        (DEFAULT, 2, 1, 'Hello World - Room Admin', CURRENT_TIMESTAMP),
        (DEFAULT, 1, 2, 'Hello World', CURRENT_TIMESTAMP);

/* Fatch Data */
SELECT * FROM user_table;
SELECT * FROM message_table;
SELECT * FROM chatroom_table;
