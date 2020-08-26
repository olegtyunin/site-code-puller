1. Установить mysql
2. Запустить "sudo service mysql start"
3. Зайти на mysql shall "mysql -u root -p"
4. Создать базу "CREATE DATABASE requests", "USE requests"
5. Создать таблицу "CREATE TABLE list( id MEDIUMINT UNSIGNED, url VARCHAR(255), statuS ENUM('new', 'processing', 'done', 'error') , http_status VARCHAR(4));"
6. Засидить данные в таблицу "INSERT INTO list (id, url) VALUES (1, 'https://proxy.io');", "INSERT INTO list (id, url) VALUES (2, 'https://reddit.com');"
