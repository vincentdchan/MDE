@echo off
setlocal

pushd %~dp0\..

set NODE_ENV = development
set ELECTRON_DEFAULT_ERROR_MODE=1
set ELECTRON_ENABLE_LOGGING=1
set ELECTRON_ENABLE_STACK_DUMPING=1

node .\node_modules\electron\cli.js . %* --enable-logging

popd

endlocal