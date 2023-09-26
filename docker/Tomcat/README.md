1. `docker build -t job-board-tomcat .`
2. `docker run -d -p 8080:8080 --net job-board-net job-board-tomcat`