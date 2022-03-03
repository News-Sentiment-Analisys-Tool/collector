CREATE DATABASE
	IF NOT EXISTS heroku_0314839b72389eb;

USE heroku_0314839b72389eb;

CREATE TABLE Source (
	source_id 	INTEGER 		NOT NULL,
    name 		VARCHAR (100) 	NOT NULL,
    created_at 	DATETIME 		NOT NULL,
    CONSTRAINT ID_PK PRIMARY KEY (source_id)
) ENGINE = InnoDB;

CREATE TABLE Information (
	id 			    VARCHAR(250) 	NOT NULL,
    text 		    VARCHAR (5000) 	NOT NULL,
    created_at 	    VARCHAR(100) 	NOT NULL,
    source_id 	    INTEGER 		NOT NULL,
    company_id 	    INTEGER 		NOT NULL,
    language        VARCHAR(2)      NOT NULL,
    sentiment_score DECIMAL(10, 2)  NOT NULL,
    CONSTRAINT ID_PK PRIMARY KEY (id),
    CONSTRAINT INFORMATION_COMPANY_FK FOREIGN KEY (company_id)
		REFERENCES Company(company_id)
			ON DELETE CASCADE
			ON UPDATE CASCADE,
    CONSTRAINT INFORMATION_SOURCE_FK FOREIGN KEY (source_id)
		REFERENCES Source(source_id)
			ON DELETE CASCADE
			ON UPDATE CASCADE
) ENGINE = InnoDB;
