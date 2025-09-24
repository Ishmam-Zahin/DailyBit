FROM openjdk:26-slim
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*
WORKDIR /spring
COPY target/DailyBit-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENV JUDGE_VOLUME="judge_volume"
CMD ["java", "-jar", "app.jar"]