CREATE DATABASE
	IF NOT EXISTS heroku_0314839b72389eb;

USE heroku_0314839b72389eb;

SELECT com.name, COUNT(*) as Information FROM Information inf
	INNER JOIN Company com
    WHERE inf.company_id = com.company_id
	GROUP BY inf.company_id;
    
SELECT COUNT(*) FROM Informations WHERE company_id = null;

SELECT com.name, COUNT(*) as Tweets FROM Tweets tw
	INNER JOIN Company com
    WHERE tw.company_id = com.company_id
	GROUP BY tw.company_id;
    
SELECT COUNT(*) FROM Tweets WHERE company_id = null;
