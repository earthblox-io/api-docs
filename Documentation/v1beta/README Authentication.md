# Authentication

Authenticating the EBX-API using an API client and access token.
 
Steps for authenticating: 
1. Use your Earth Blox username and password to generate an OAuth2 `client_id` and `client_secret`. 
2. Use your OAuth2 Client to generate a 1 hour token. 
3. Use this token to access the EBX API. 

Example authentication flows are provided for:

[REST API](#Authenticating-with-REST-API) 

[PYTHON CLIENT](#Authenticating-with-the-python-client)


The python client can be accessed from [pypi](https://pypi.org/project/ebx/) or installed with pip: 

```
pip install ebx
```

## Authenticating with REST API

#### Generating a hash of your username and password

In order to generate an API Client, you must first hash your regular Earth Blox username and password as below: 

```bash
echo -n 'user@earthblox.io:password' | base64
```
#### Generating OAuth2 Client credentials

The generated hash can then be used to generate a `client_id` and `client_secret`: 

```bash
curl --location 'https://api.earthblox.io/services/auth/client' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic %HASH%' \
--data '{"name":"EBX api", "description": "EBX api"}'
```
A name and description are required.

#### Generating an API access token

The `client_id` and `client_secret` do not expire and are used to generate a short-lived(1 hour) token.
Use the Authorisation header with basic authentication where your client id is the username and client secret is the password.
When your token expires, a new one can be generated using the same credentials. Please note,`grant type` is required and must be set to "client_credentials".

```bash
echo -n "%CLIENT_ID%:%CLIENT_SECRET" | base64

```bash 
curl --location 'https://api.earthblox.io/services/oauth/token' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic %HASH%' \
--data '{"grant_type":"client_credentials"}'
```

The API can now be accessed with the token, see the tutorials on how to retrieve your projects, create a new run and access the outputs. 

## Authenticating with the python client

Install python lib

```
pip install ebx
```


#### Registering a new client

To register a new client and generate a `client_id` and `client_secret`: 

```python
import ebx
from ebx.config import ServiceClientConfig

email = 'user@earthblox.io'
password = 'password'
name = 'EBX API'
oauthClientModel = ebx.create_oauth_client(email, password, name)
oauthClientModel.save(ServiceClientConfig())
```
By default the details are saved in a file within .ebx/.ebx.auth.json in the current working directory.

#### Authenticating 


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
