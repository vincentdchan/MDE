@echo off
setlocal

pushd %~dp0\..

set NODE_ENV = development
set ELECTRON_DEFAULT_ERROR_MODE=1
set ELECTRON_ENABLE_LOGGING=1
set ELECTRON_ENABLE_STACK_DUMPING=1

electron . %* --enable-logging

popd

endlocal