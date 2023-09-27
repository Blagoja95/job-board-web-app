# Container for MYSQL server

## How to use it

IN CLI type these commands: 

1. `docker build -t job-board-mysql-image .`
2. `docker run -d -p 3306:3306 --name job-board-mysql --net job-board-net -e MYSQL_ROOT_PASSWORD=mydbpassword job-board-mysql-image`

MYSQL container is now running -> next step is to create Tomcat container

## To access mysql cli

1. `docker exec -it jobPostingsDB bash`
2. `mysql -u root -p` -> then type password `mydbpassword`

- [x] Persistence data thanks to volumes
- [ ] Docker compose