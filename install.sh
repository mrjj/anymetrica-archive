#!/usr/bin/env bash

echo "Anymetrica SDK installer launcher"

if [[ "$OSTYPE" == "linux-gnu" ]]; then
    ./anymetrica-sdk/build/sdk-linux
elif [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OSX
    ./anymetrica-sdk/build/sdk-macos
elif [[ "$OSTYPE" == "cygwin" ]]; then
    # POSIX compatibility layer and Linux environment emulation for Windows
    ./anymetrica-sdk/build/sdk-win.exe
elif [[ "$OSTYPE" == "msys" ]]; then
    # Lightweight shell and GNU utilities compiled for Windows (part of MinGW)
    ./anymetrica-sdk/build/sdk-win.exe
elif [[ "$OSTYPE" == "win32" ]]; then
    # I'm not sure this can happen.
    ./anymetrica-sdk/build/sdk-win.exe
elif [[ "$OSTYPE" == "freebsd"* ]]; then
    echo "'${OSTYPE}' not currently supported."
else
    echo "'${OSTYPE}' not currently supported."
fi
