# Container for MYSQL server

## How to use it

IN CLI type these commands:

1. `docker build -t job-board-tomcat-image .`
2. `docker run --name job-board-tomcat -d -p 8080:8080 --net job-board-net job-board-tomcat-image`

Tomcat container is now running -> next step generating react app on NodeJS server