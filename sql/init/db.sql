/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS lashmaker;
USE lashmaker;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(64) NOT NULL,
    password varchar(128) NOT NULL
);

INSERT INTO users
SET email = "admin@gmail.com", password = "$2b$10$KGO.1vMIjjTTdwsi5PxtcehvMAIfMBw/zlF1JHM2rLr.9hVC8fDFe";

DROP TABLE IF EXISTS images;
CREATE TABLE images (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(64) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS cards;
CREATE TABLE cards (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(64) NOT NULL,
    description text NOT NULL,
    buttonText varchar(128) NOT NULL,
    link varchar(128) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0,
    pageText text,
    pageImage varchar(64) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS cards_images;
CREATE TABLE cards_images (
    cardsId int(11) NOT NULL,
    imagesId int(11) NOT NULL,
    FOREIGN KEY (cardsId) REFERENCES cards(id) ON DELETE CASCADE,
    FOREIGN KEY (imagesId) REFERENCES images(id) ON DELETE CASCADE,
    PRIMARY KEY (cardsId, imagesId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS features;
CREATE TABLE features (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(64) NOT NULL,
    description varchar(128) NOT NULL,
    icon varchar(128) NOT NULL,
    iconColor varchar(32) NOT NULL,
    image varchar(64) NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS professionalFeatures;
CREATE TABLE professionalFeatures (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(64) NOT NULL,
    description varchar(128) NULL,
    icon varchar(128) NOT NULL,
    iconColor varchar(32) NOT NULL,
    image varchar(64) NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS settings;
CREATE TABLE settings (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `key` varchar(64) NOT NULL,
    value text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS addresses;
CREATE TABLE addresses (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(64) NOT NULL,
    address varchar(128) NOT NULL,
    subway varchar(128) NOT NULL,
    color varchar(32) NOT NULL,
    lat float(11, 5) NOT NULL,
    lng float(11, 5) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS masters;
CREATE TABLE masters (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(128) NOT NULL,
    role varchar(128) NOT NULL,
    description text NULL,
    photo varchar(128) NULL,
    dikidiId int(11) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS services;
CREATE TABLE services (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(128) NOT NULL,
    description text NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS masters_services;
CREATE TABLE masters_services (
    mastersId int(11) NOT NULL,
    servicesId int(11) NOT NULL,
    price float(11, 2)  NOT NULL,
    FOREIGN KEY (mastersId) REFERENCES masters(id) ON DELETE CASCADE,
    FOREIGN KEY (servicesId) REFERENCES services(id) ON DELETE CASCADE,
    PRIMARY KEY (mastersId, servicesId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(128) NOT NULL,
    price float(11, 2) NOT NULL,
    discount float(11, 2) NOT NULL default 0,
    description text NULL,
    duration tinyint(2) NOT NULL,
    modelsCount tinyint(1) NOT NULL DEFAULT 0,
    schedule text NULL,
    teachersId int(11) NOT NULL,
    theory text NULL,
    practice text NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS faq;
CREATE TABLE faq (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question text NOT NULL,
    answer text NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS vacancies;
CREATE TABLE vacancies (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(64) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS social;
CREATE TABLE social (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(32) NOT NULL,
    icon varchar(64) NOT NULL,
    link varchar(128) NOT NULL,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS records;
CREATE TABLE records (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mastersId int(11) NOT NULL,
    servicesId int(11) NOT NULL,
    addressesId int(11) NOT NULL,
    name varchar(64) NULL,
    phone varchar(12) NULL,
    FOREIGN KEY (mastersId) REFERENCES masters(id) ON DELETE CASCADE,
    FOREIGN KEY (servicesId) REFERENCES services(id) ON DELETE CASCADE,
    FOREIGN KEY (addressesId) REFERENCES addresses(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stars tinyint(1) NOT NULL DEFAULT 5,
    text text NOT NULL,
    author varchar(64) NOT NULL,
    isShown tinyint(1) NOT NULL DEFAULT 0,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sort int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


