FROM openjdk:22-jdk

WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline

COPY src ./src

RUN ./mvnw package

EXPOSE 8082

CMD ["java", "-jar", "target/theater-0.0.1-SNAPSHOT.jar"]