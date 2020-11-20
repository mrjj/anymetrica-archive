# AnyMetrica

**AnyMetrica** - commercial analytical software targeted to work with media sources analysis.

[API Documentation](anymetrica-api/doc/index.md)

## Developer environment

`Docker` (`>=18`) and `node.js` (`==v10.13.0`) will be required for SDK installation and they are included as mandatory step as SDK installation process.

#### Linux

```sh
$ ./install.sh
```

#### MacOS

```sh
$ ./install.sh
```

#### Windows (very basic support)

```PowerShell
> install.bat
```

### Mobile client env

Following command will download Android Studio and install 27.0 Version of SDK

```sh
$ npm run bootstrap:mobile
```

### Repository structure

#### Repo folders
  - `/anymetrica` - root repo where this doc file should be locatedprotocol buffers defining all interfaces contracts

  - `/anymetrica-api` - protocol buffers defining all interfaces contracts
  - `/anymetrica-registry` - core business logic entities and their relations registry service
  - `/anymetrica-scope` - administrative Web UI
  - `/anymetrica-sdk` - SDK installer
  - `/anymetrica-sosalka` - ML models and media assets downloader/installer/manager
  - `/deployment` - deployment scripts
  - `/dockerfiles` - Docker files
  - `/scripts` - misc scripts
  
#### Launchers
  
  - `/install.sh` - Linux/MacOS/POSIX SDK installation
  - `/install.bat` - Windows NT 64 installation
  
  Execute `$ yarn run` command in repo root to see all launchers that could be used as: `$ yarn run [SCRIPT NAME]`.

#### Local data

  - `/DATA` - Local ML data folder not included in repo
  - `/build` - Local build data folder not included in repo
  - `/logs` - Local logs not included in repo

### Maintained third parties:

  - [grid-grpc](https://bitbucket.org/anymetrics/grid-grpc/src) - provides GRPC bridge and code generations for the generic web/ws clients.

  - [PyTorch Speaker Verification](https://github.com/mrjj/PyTorch_Speaker_Verification.git) ([forked from](https://github.com/HarryVolek/PyTorch_Speaker_Verification)) - PyTorch implementation of speech embedding net and loss described here: [Generalized end-to-end loss for speaker verification (2018)](https://arxiv.org/pdf/1710.10467.pdf).

    Also contains code to create embeddings compatible as input for the speaker diarization model found at [Google UIS RNN](https://github.com/google/uis-rnn).

  - [protobuf-jsonschema-validate](https://github.com/mrjj/protobuf-jsonschema-validate) Make JSON schema based on [protoc-gen-validate](https://github.com/lyft/protoc-gen-validate) format.

