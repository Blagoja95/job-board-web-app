FROM maven:latest AS builder
LABEL author="boris.blagoejvicc@hotmail.com"

WORKDIR /app

COPY backend/pom.xml .

RUN mvn clean install

COPY backend/src ./src

RUN mvn package -Dmaven.test.skip

FROM tomcat:10

WORKDIR /usr/local/tomcat/webapps/

COPY --from=builder /app/target/burza-rada-1.0-SNAPSHOT.war  /usr/local/tomcat/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]