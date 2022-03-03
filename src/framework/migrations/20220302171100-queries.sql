CREATE DATABASE
	IF NOT EXISTS heroku_0314839b72389eb;

USE heroku_0314839b72389eb;

SELECT com.name, COUNT(*) as Information FROM Information inf
	INNER JOIN Company com
    WHERE inf.company_id = com.company_id
	GROUP BY inf.company_id;
    
SELECT * FROM Information
	WHERE created_at > '2022-02-16' AND created_at < '2022-02-18'
    AND company_id = 1;

SELECT com.name, COUNT(*) as Tweets FROM Tweets tw
	INNER JOIN Company com
    WHERE tw.company_id = com.company_id
	GROUP BY tw.company_id;
    
SELECT COUNT(*) FROM Tweets WHERE company_id = null;

-- Sentiment Score
SELECT com.name, AVG(sentiment_score) as Sentiment_Score
	FROM Information as inf
	INNER JOIN Company com
        WHERE inf.company_id = com.company_id
		AND sentiment_score != 0
	GROUP BY inf.company_id;
