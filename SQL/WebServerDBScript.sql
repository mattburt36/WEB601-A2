-- Begin by dropping database, then creating, then pointing the server to use this database  
DROP DATABASE IF EXISTS WebServerDB; 
CREATE DATABASE WebServerDB;
USE WebServerDB; 

-- Drop procedure to create database
DROP PROCEDURE IF EXISTS prMakeWebServerDB;
-- Change the delimiter to "//" to control beginning and end of execution of code 
DELIMITER //
-- Create procedure to create the databse 
CREATE PROCEDURE prMakeWebServerDB()
-- Begin the procedure 
BEGIN
-- Drop all tables
-- -----------------------------------
DROP TABLE IF EXISTS categoryT;
DROP TABLE IF EXISTS customerT;
DROP TABLE IF EXISTS productT;
DROP TABLE IF EXISTS orderT;
DROP TABLE IF EXISTS cartT;
DROP TABLE IF EXISTS sessionT;
-- -----------------------------------
CREATE TABLE categoryT
(
	categoryID INT PRIMARY KEY auto_increment,
    categoryDesc VARCHAR(100)
);

CREATE TABLE customerT
(
	customerID INT PRIMARY KEY auto_increment,
    customerFirstName VARCHAR(100),
    customerEmail VARCHAR(100),
    customerPassword VARCHAR(50),
    address VARCHAR(100)
);

CREATE TABLE productT
(
	productID INT PRIMARY KEY auto_increment,
    productDesc VARCHAR(100),
    categoryID INT NULL,
	quantity INT,
    FOREIGN KEY (categoryID) REFERENCES categoryT (categoryID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orderT
(
	orderID INT PRIMARY KEY auto_increment,
    customerID INT NULL,
    productID INT NULL,
	trackingID INT NULL,
    FOREIGN KEY (customerID) REFERENCES customerT (customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES productT (productID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE cartT
(
	cartID INT PRIMARY KEY auto_increment,
    customerID INT NULL,
    productID INT NULL,
    FOREIGN KEY (customerID) REFERENCES customerT (customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES productT (productID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sessionT
(
	sessionID INT PRIMARY KEY auto_increment,
    customerID INT NULL,
    productID INT NULL,
    cartID INT NULL,
    FOREIGN KEY (customerID) REFERENCES customerT (customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (productID) REFERENCES productT (productID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (cartID) REFERENCES cartT (cartID) ON DELETE CASCADE ON UPDATE CASCADE
);
END//
DELIMITER ;
CALL prMakeWebServerDB();