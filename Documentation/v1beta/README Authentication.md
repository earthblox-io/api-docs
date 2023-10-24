# Authentication

Authenticating the EBX-API using an access token.

Please note: in order to register a new client, a user with the `api_org_admin` role is needed.

Steps for authenticating: 
1. Using your username and password to generate a `client_id` and `client_secret`. 
2. Use those to generate a 1 hour token. 
3. Use this token to access the EBX API. 

Examples are provided for access to the API through curl requests and through the python client. 

## Authenticating with curl

### Generating a hash of your username and password

In order to generate a token to access the API, you must first hash your username and password using the following command : 

```bash
echo -n 'user@earthblox.io:password' | base64
```

### Generating a bearer token

The generated hash can then be used to generate a `client_id` and `client_secret`: 

```bash
curl --location 'https://api.earthblox.io/services/auth/client' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic %HASH%' \
--data '{"name":"EBX api", "description": "EBX api"}'
```

A name and description are required.

The `client_id` and `client_secret` do not expire and are used to generate a short-lived(1 hour) token. When your token expires, a new one can be generated using the same credentials. Please note,`grant type` is required and must be set to "client_credentials".

```bash 
curl --location 'https://api.earthblox.io/services/oauth/token' \
--header 'Content-Type: application/json' \
--data '{"client_id":"%CLIENT_ID","client_secret":"%CLIENT_SECRET%", "grant_type":"client_credentials"}'
```

The API can now be accessed with the token, see the tutorials on how to retrieve your projects, create a new run and access the outputs. 

## Authenticating with the python client

### Registering a new client

To register a new client and generate a `client_id` and `client_secret`: 

```python
import ebx

email = 'user@earthblox.io'
password = 'password'
name = 'EBX API'
oauthClientModel = ebx.create_oauth_client(email, password, name)
oauthClientModel.save()
```
By default the details are saved in a file within .ebx/.ebx.auth.json in the current working directory.

### Authenticating 

There are several ways to authenticate with the API through the python client: 

1. Using saved credentials
2. Using the `client_id` and `client_secret` directly. 
3. Using a token directly. 

To use credentials saved by creating a client: 

```python 
import ebx
ebx.auth_using_creds()
```

To use the `client_id` and `client_secret` directly: 

```python
import ebx
ebx.auth_using_oauth(client_id, client_secret)
```

To use a token directly you must supply an env variable called `EBX_API_TOKEN`: 
```python
import ebx
ebx.auth_using_env()
```