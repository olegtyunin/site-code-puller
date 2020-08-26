## How to deploy
Install MySQL  
Run mysql: `sudo servise mysql start`  
Open mysql shell by user and password which were made during installation  
Create a main DB: `CREATE TABLE requests`  
Create target table:  
```CREATE TABLE list( id MEDIUMINT UNSIGNED, url VARCHAR(255), statuS ENUM('new', 'processing', 'done', 'error') , http_status VARCHAR(4));```  

Seed DB:
```
INSERT INTO list (id, url) VALUES (1, 'https://proxy.io');
INSERT INTO list (id, url) VALUES (2, 'https://reddit.com');
INSERT INTO list (id, url) VALUES (3, 'https://notexistingsite.com');
```
Run application: `npm run start`
