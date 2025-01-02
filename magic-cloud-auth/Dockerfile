FROM openjdk:17-oracle
VOLUME /tmp
EXPOSE 8081
ADD ./build/libs/backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]