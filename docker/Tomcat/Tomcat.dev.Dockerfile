FROM tomcat:latest

LABEL maintainer="Boris Blagojević <boris.blagojevicc@hotmail.com>"

ENV JRE_HOME:           /usr
ENV CATALINA_BASE       /usr/local/tomcat
ENV CATALINA_HOME       /usr/local/tomcat
ENV CATALINA_TMPDIR     /usr/local/tomcat/temp
ENV CLASSPATH:          /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar
ENV JAVA_OPTS "-Djava.awt.headless=true -Djava.security.egd=file:/dev/./urandom"

RUN rm -rf $CATALINA_BASE/webapps/*

COPY burza-rada-1.0-SNAPSHOT.war $CATALINA_BASE/webapps/ROOT.war

EXPOSE 8080

CMD ["catalina.sh", "run"]