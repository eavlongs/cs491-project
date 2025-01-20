@echo off
REM Check if two arguments are provided
if "%~1"=="" (
    echo Error: Directory name is required.
    exit /b 1
)

if "%~1" == "pretty" (
    cd core/front
    npm run pretty

    cd ../../subscription/front
    npm run pretty

    cd ../../store/front
    npm run pretty

    cd ../../theater/front
    npm run pretty
    exit /b 0
)

if "%~2"=="" (
    echo Error: Specify whether to run "front" or "back".
    exit /b 1
)

REM Set variables for arguments
set directory=%~1
set mode=%~2

REM Remove starting "./" from directory
if "%directory:~0,2%"=="./" (
    set directory=%directory:~2%

) else if "%directory:~0,2%"==".\" (
    set directory=%directory:~2%
)

REM Remove trailing "/" from directory
if "%directory:~-1%"=="/" (
    set directory=%directory:~0,-1%
) else if "%directory:~-1%"=="\" (
    set directory=%directory:~0,-1%
)

REM Navigate to the specified directory
if exist "%directory%" (
    cd "%directory%"
) else (
    echo Error: Directory "%directory%" does not exist.
    exit /b 1
)

REM Handle "front" mode
if /i "%mode%"=="front" (
    cd front
    echo Running frontend in "%directory%"...
    npm run dev
    exit /b 0
)

REM Handle "back" mode
if /i "%mode%"=="back" (
    cd back
    if /i "%directory%"=="core" (
        echo Running core backend...
        REM Replace this with the actual core backend command
        if /i "%~3" == "air" (
            air
        ) else (
            go run main.go
        )
    ) else if /i "%directory%"=="subscription" (
        echo Running subscription backend...
        REM Replace this with the actual subscription backend command
        npm run dev
    ) else if /i "%directory%"=="store" (
        echo Running store backend...
        REM Replace this with the actual store backend command
        php artisan serve
    ) else if /i "%directory%"=="theater" (
        echo Running theater backend...
        REM Replace this with the actual theater backend command
        ./mvnw spring-boot:run
    ) else (
        echo Error: Unknown backend directory "%directory%".
        exit /b 1
    )
    exit /b 0
)

REM Handle invalid mode
echo Error: Invalid mode specified. Use "front" or "back".
exit /b 1
