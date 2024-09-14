docker run -d -p 33060:3306 --name mysql-db -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=taskappdb --mount src=mysql-db-data,dst=/var/lib/mysql mysql

sleep 10

docker exec mysql-db mysql -uroot -p123456 -e "CREATE DATABASE IF NOT EXISTS taskappdb;"
