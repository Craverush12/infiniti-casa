@echo off
echo HEIC to JPG Conversion Script for Windows
echo ==========================================

REM Check if ImageMagick is installed
where magick >nul 2>nul
if %errorlevel% neq 0 (
    echo ImageMagick not found. Please install it from: https://imagemagick.org/script/download.php#windows
    echo After installation, restart this script.
    pause
    exit /b 1
)

echo ImageMagick found! Starting conversion...
echo.

REM Set source and destination directories
set "SOURCE_DIR=src\asssets"
set "DEST_DIR=public\assets"

REM Create destination directory if it doesn't exist
if not exist "%DEST_DIR%" mkdir "%DEST_DIR%"

REM Loop through each property folder
for /d %%i in ("%SOURCE_DIR%\*") do (
    echo Processing folder: %%~nxi
    
    REM Create corresponding destination folder
    if not exist "%DEST_DIR%\%%~nxi" mkdir "%DEST_DIR%\%%~nxi"
    
    REM Convert all HEIC files in the folder
    for %%j in ("%%i\*.heic" "%%i\*.HEIC") do (
        if exist "%%j" (
            echo Converting: %%~nxj
            magick "%%j" "%DEST_DIR%\%%~nxi\%%~nj.jpg"
        )
    )
    
    echo Completed: %%~nxi
    echo.
)

echo Conversion complete!
echo.
echo Next steps:
echo 1. Check the converted images in public\assets\
echo 2. Run your development server: npm run dev
echo 3. Test the asset viewer at: http://localhost:5173/asset-viewer.html
echo.
pause 