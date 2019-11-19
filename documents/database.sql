--  Code to create database

-- mysql -u root -p -h tr-database-instance.cvkjxhkotxbr.eu-west-2.rds.amazonaws.com

CREATE DATABASE todo_app;

USE todo_app;

CREATE TABLE user (userid VARCHAR(75), 
              firstName VARCHAR(100),  
              lastName VARCHAR(100),
              PRIMARY KEY(userid)
);

INSERT INTO user VALUES ('helen.gardner',"Helen", "Gardner");
INSERT INTO user VALUES ("graham.raeburn","Graham","Raeburn");
INSERT INTO user VALUES ("tony.gardner","Tony","Gardner");


CREATE TABLE task (text VARCHAR(75), 
                   completed boolean,
                   dateDue date,
                   dateDone date,
                   id VARCHAR(100), 
                   userid VARCHAR(75),  
                   PRIMARY KEY(id),
                   FOREIGN KEY (userid) REFERENCES user(userid)
);

INSERT INTO task VALUES("clean car", false, "20191130","", "1", "helen.gardner");
INSERT INTO task VALUES("wash dog", false, "20191129","", "2", "helen.gardner");
INSERT INTO task VALUES("hoover garden", false, "20191117","", "3", "graham.raeburn");
INSERT INTO task VALUES("make cheesecake",true, "20191101","20191111", "4", "graham.raeburn");
INSERT INTO task VALUES("make cheesecake",true, "20191102","20191112", "5", "helen.gardner");
INSERT INTO task VALUES("super long task to check rendering even longer that this", false, "20191118","", "6", "tony.gardner");
INSERT INTO task VALUES("make cheesecake",true, "20191103","20191110", "7", "tony.gardner");

