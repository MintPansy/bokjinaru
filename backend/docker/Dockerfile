# Railway: Root Directory = backend, Builder = Dockerfile
# ---- Build ----
FROM gradle:8.7-jdk17-alpine AS build
WORKDIR /build
COPY app/bokjinaru/ ./
RUN gradle bootJar -x test --no-daemon

# ---- Run ----
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring
COPY --from=build /build/build/libs/*.jar app.jar
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
