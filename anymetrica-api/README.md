# Anymetrica API

Anymetrica API specifications and documentation generator

[API Documentation](docs/api.md)

#### Running documentation site

To start local documentation site:

1. Install [Docker](https://www.docker.com/products/docker-desktop) if you don't have it already installed.

2. Run
 
   ```bash
   $ npm run start
   ```

The documentation site will be started in Docker container and you could reach it by opening [http://localhost:3003](http://localhost:3003) (internal container port will be: `3000` and live reload port for dev mode is supposed to be on `35729`)

#### Building distributable assets

To re-build web client, documentation site content and other distributable assets run

```bash
$ npm run build
```

All distributable assets will be saved to `./dist` folder.
