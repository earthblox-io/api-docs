 # Accessing table outputs 

 In order to complete any of the requests in these tutorials, a bearer token is required. See the [Authentication page](../README%20Authentication.md) for more details on how to generate one. 

Links to the reference docs can be found throughout this tutorial. 

Examples of both curl requests and the python client are provided. 

The table outputs from a run can be retrieved with the following request:

```bash 
curl --location 'https://api.earthblox.io/v1beta/runs/{run_id}/outputs' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
#Python example
outputs = run.outputs
print(outputs)
```

[Get run outputs reference](https://api.earthblox.io/docs#/runs/get_run_tables_v1beta_runs__run_id__tables_get)
