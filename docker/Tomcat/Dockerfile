FROM tomcat:latest

ENV CATALINA_BASE /usr/local/tomcat
ENV CATALINA_HOME /usr/local/tomcat
ENV CATALINA_TMPDIR /usr/local/tomcat/temp
ENV JAVA_OPTS "-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom"

RUN rm -rf $CATALINA_BASE/webapps/*

COPY burza-rada-1.0-SNAPSHOT.war $CATALINA_BASE/webapps/ROOT.war

COPY mysql-connector-j-8.1.0.jar $CATALINA_HOME/lib/

EXPOSE 8080

CMD ["catalina.sh", "run"]