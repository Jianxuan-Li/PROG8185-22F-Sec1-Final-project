# Frontend boilerplate

## For Developer

### Frontend

Option 1: For container development:

1. Create the container: `./dev frontend`
2. Re-install PNP pakcages by Yarnpkg: `yarn install`
3. Start Webpack dev-server: `yarn start`

Option 2: For native development:

(Nodejs and yarnpkg installed is required)
1. `export NODE_ENV=development`
1. `yarn install`
1. `yarn start`

Access: http://localhost:9000/ 

PnP's SDK for VScode: `yarn dlx @yarnpkg/sdks vscode`

### Recycle development container

`./dev down`

## Deployment

Arguments for docker

```bash
- api_host=
- api_prefix=/api
- path_prefix=
```
