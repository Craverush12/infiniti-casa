@echo off
echo HEIC to JPG Converter for Windows
echo ==================================

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python not found. Please install Python from: https://python.org/
    pause
    exit /b 1
)

REM Check if required packages are installed
python -c "import PIL, pillow_heif" >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing required packages...
    pip install -r scripts\requirements.txt
    if %errorlevel% neq 0 (
        echo Failed to install packages. Please run manually:
        echo pip install Pillow pillow-heif
        pause
        exit /b 1
    )
)

echo.
echo Starting HEIC conversion...
echo.

REM Run the Python script
python scripts\convert_heic.py %*

echo.
echo Conversion script completed!
pause 