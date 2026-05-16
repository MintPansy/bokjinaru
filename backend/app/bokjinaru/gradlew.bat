@rem Gradle wrapper (Windows). Railway 배포는 Docker가 Gradle 이미지를 사용합니다.
@if "%DEBUG%"=="" @echo off

set DIRNAME=%~dp0
set APP_HOME=%DIRNAME%

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome
set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if %ERRORLEVEL% equ 0 goto execute
echo JAVA_HOME is not set and java was not found in PATH.
exit /b 1

:findJavaFromJavaHome
set JAVA_EXE=%JAVA_HOME%/bin/java.exe
if exist "%JAVA_EXE%" goto execute
echo Invalid JAVA_HOME: %JAVA_HOME%
exit /b 1

:execute
set CLASSPATH=%APP_HOME%gradle\wrapper\gradle-wrapper.jar
"%JAVA_EXE%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*
