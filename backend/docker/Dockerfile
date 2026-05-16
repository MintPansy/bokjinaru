FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /workspace/app/paperdot
COPY app/paperdot/ ./
RUN chmod +x gradlew 2>/dev/null || true
RUN if [ -f gradlew ]; then ./gradlew bootJar -x test --no-daemon; fi

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /workspace/app/paperdot/build/libs/*.jar app.jar 2>/dev/null || true
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -jar app.jar 2>/dev/null || echo 'Build JAR first'"]
