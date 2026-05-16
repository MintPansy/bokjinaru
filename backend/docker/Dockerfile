FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app/bokjinaru
COPY app/bokjinaru/ ./
RUN chmod +x gradlew 2>/dev/null || true
RUN if [ -f gradlew ]; then ./gradlew bootJar -x test --no-daemon; fi

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/bokjinaru/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
