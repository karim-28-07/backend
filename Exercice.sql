-- Creation de la table students

CREATE TABLE IF NOT EXISTS  students (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (30),
ville VARCHAR (30)
);

INSERT INTO students (name, ville)
VALUES (
"Veronique",
 "Paris"
),
("Steeven",
 "Lyon"
 ),
 ("Marc",
  "Marseille"
 ),
 ("Nour",
 "Lyon"
 ),
 ("Romain",
 "Paris"
 ),
 ("Sophie",
 "Paris"
 );

CREATE TABLE IF NOT EXISTS  languages (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
name VARCHAR (30)

);

insert into languages (name)
VALUES ("French"),
("English"),
("German"),
("Spanish"),
("Mandarin");

CREATE TABLE IF NOT EXISTS  favorites (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
class VARCHAR (30),
sport VARCHAR (30),
student_id INT UNSIGNED 
);

INSERT INTO favorites (class, sport, student_id)
VALUES 
("Maths","Cricket",2),
("Music","Hip-Hop",6),
("Arts", "Boxing", 1),
("Literature", "Tennis", 3),
("Computer science", "Tennis", 5),
("Arts", "Baseball", 4);

CREATE TABLE IF NOT EXISTS students_languages  (
id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
student_id INT UNSIGNED,
language_id INT UNSIGNED
);

insert into students_languages (student_id, language_id)
VALUES (1, 1), (1 , 2), (2, 1), 
(2, 3), (3, 1), (4, 1), (4, 2), 
(4, 4), (4, 5), (5, 1), (5, 5), 
(6, 1), (6, 2), (6, 3);

-- Récupation des données 

select * from students WHERE id = 3;
select * from students WHERE id = 6;

select name, ville from students WHERE id = 1;
select name from students WHERE id = 2;

SELECT * FROM students WHERE ville = "Paris" ;
SELECT * FROM students WHERE ville = "Lyon" ;

SELECT * FROM students LEFT JOIN  favorites on students.id = favorites.student_id;