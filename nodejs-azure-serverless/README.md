# Azure Serverless Functions Example

Refer to [Serverless docs](https://serverless.com/framework/docs/providers/azure/guide/intro/) for more information.

## How to run

Before all, install `node_modules` dependencies
```shell
$ yarn
```

Setting up offline functions
```shell
$ sls offline
```

Invoking functions
```shell
$ sls invoke local -f <FUNCTION_NAME> -d <BODY_DATA>
```

## Environment

 - MONGODB_URL = Environment that references MongoDB.

## Test coverage
```shell
$ yarn test
```

## How to deploy
Beware of configure Azure environment.

You can find how to configure your Javascript Development Environment [here](https://docs.microsoft.com/pt-br/azure/developer/javascript/core/configure-local-development-environment?tabs=cmd), setting up variables like:
```shell
AZURE_SUBSCRIPTION_ID="aa11bb33-cc77-dd88-ee99-0918273645aa"
AZURE_TENANT_ID="00112233-7777-8888-9999-aabbccddeeff"
AZURE_CLIENT_ID="12345678-1111-2222-3333-1234567890ab"
AZURE_CLIENT_SECRET="abcdef00-4444-5555-6666-1234567890ab"
```

Execute
```shell
$ az ad sp create-for-rbac --name <NAME>
```

And you will be replied something like this
```json
{
  "appId": <APP_ID>,
  "displayName": <DISPLAYED_NAME>,
  "name": <APP_NAME>,
  "password": <APP_PASSWORD>,
  "tenant": <TENANT>
}
```
Paste it on subscription field on `~/.azure/sls`