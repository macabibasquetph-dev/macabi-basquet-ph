@echo off
REM Doble clic en este archivo (Windows) para que la pagina detecte las fotos nuevas.
cd /d "%~dp0"
python herramientas\actualizar_fotos.py
if errorlevel 9009 py herramientas\actualizar_fotos.py
pause
