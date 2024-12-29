@echo off
REM Check if two arguments are provided
if "%~1"=="" (
    echo Error: Directory name is required.
    exit /b 1
)

if "%~2"=="" (
    echo Error: Specify whether to run "front" or "back".
    exit /b 1
)

REM Set variables for arguments
set directory=%~1
set mode=%~2

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
        echo Command not specified for subscription backend yet.
    ) else if /i "%directory%"=="store" (
        echo Running store backend...
        REM Replace this with the actual store backend command
        echo Command not specified for store backend yet.
    ) else if /i "%directory%"=="theater" (
        echo Running theater backend...
        REM Replace this with the actual theater backend command
        echo Command not specified for theater backend yet.
    ) else (
        echo Error: Unknown backend directory "%directory%".
        exit /b 1
    )
    exit /b 0
)

REM Handle invalid mode
echo Error: Invalid mode specified. Use "front" or "back".
exit /b 1
