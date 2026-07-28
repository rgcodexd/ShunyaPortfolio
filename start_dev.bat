@echo off
echo Starting Shunya Studio Development Servers...

REM Start the Node.js/Express Backend in a new terminal window
start "Shunya Backend (Express)" cmd /c "echo Starting Backend... && cd backend && npm run dev"

REM Start the Astro Frontend in a new terminal window
start "Shunya Frontend (Astro)" cmd /c "echo Starting Frontend... && cd frontend && npm run dev"

echo Development servers are spinning up in separate windows!
