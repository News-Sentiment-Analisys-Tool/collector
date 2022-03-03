CREATE DATABASE
	IF NOT EXISTS heroku_0314839b72389eb;

USE heroku_0314839b72389eb;

INSERT INTO Source (source_id, name, created_at) VALUES (1, 'twitter', now());

INSERT INTO Company (company_id, name, created_at) VALUES (1, 'itau', now());
INSERT INTO Company (company_id, name, created_at) VALUES (2, 'petrobras', now());
INSERT INTO Company (company_id, name, created_at) VALUES (3, 'bradesco', now());
INSERT INTO Company (company_id, name, created_at) VALUES (4, 'b3', now());