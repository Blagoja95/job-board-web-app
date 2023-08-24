# Container for MYSQL server

## How to use it

IN CLI type these commands: 

1`docker build -t jobpostingdb .`
2. `docker run -d -p 3306 --name jobPostingsDB -e MYSQL_ROOT_PASSWORD=mydbpassword jobpostingdb`

Docker image created (for now manually run Tomcat server)

## To access mysql cli

1. `docker exec -it jobPostingsDB bash`
2. `mysql -u root -p` -> then type password `mydbpassword`

- [ ] Docker repo image soon
- [ ] Persistence data thanks to volumes
- [ ] Docker compose