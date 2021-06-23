@echo off

:restart
    echo [SYSTEM]: Running node index.js
    echo [SYSTEM]: Timing 1000ms

    nodemon index.js

pause > nul
goto :restart