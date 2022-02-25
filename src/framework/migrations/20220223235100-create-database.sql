CREATE DATABASE
	IF NOT EXISTS heroku_0314839b72389eb;    

USE heroku_0314839b72389eb;

CREATE TABLE Company (
	company_id 	INTEGER 		NOT NULL	AUTO_INCREMENT,
    name 		VARCHAR (100) 	NOT NULL,
    created_at 	DATETIME 		NOT NULL,
    CONSTRAINT ID_PK PRIMARY KEY (company_id)
) ENGINE = InnoDB;


CREATE TABLE Tweets (
	id 			VARCHAR(250) 	NOT NULL,
    text 		VARCHAR (5000) 	NOT NULL,
    created_at 	DATETIME 		NOT NULL,
    author_id 	VARCHAR(300) 	NOT NULL,
    company_id 	INTEGER 		NOT NULL,
    CONSTRAINT ID_PK PRIMARY KEY (id),
    CONSTRAINT TWEETS_COMPANY_FK FOREIGN KEY (company_id)
		REFERENCES Company(company_id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
) ENGINE = InnoDB;

ALTER TABLE Tweets MODIFY COLUMN created_at VARCHAR(100);

INSERT INTO Company (company_id, name, created_at) VALUES (1, 'itau', now());
INSERT INTO Company (company_id, name, created_at) VALUES (2, 'petrobras', now());
INSERT INTO Company (company_id, name, created_at) VALUES (3, 'bradesco', now());
INSERT INTO Company (company_id, name, created_at) VALUES (4, 'b3', now());

SELECT com.name, COUNT(*) as Tweets FROM Tweets tw
	INNER JOIN Company com
    WHERE tw.company_id = com.company_id
	GROUP BY tw.company_id;
    
SELECT COUNT(*) FROM Tweets WHERE company_id = null;
