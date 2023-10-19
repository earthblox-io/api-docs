# Creating a new run

In order to complete any of the requests in these tutorials, a bearer token is required. See the [Authentication page](../README%20Authentication.md) for more details on how to generate one. 

Links to the reference docs can be found throughout this tutorial. 

Examples of both curl requests and the python client are provided. 

## Creating a new run from a project id

Once you have a list of projects, a new run can be created using a project id and specifying substitutions for `start_date`, `end_date` and `study_area`. However, these substitutions are not required and if not specified, the dates from the workflow will be used.

Other parameters can be set if you would like include geometry in any table outputs using `includes_geometry = true` and if you would like to generate a thumbnail of the output `generate_thumbnails: true`. These are also not required. 

```bash 
curl --request POST --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer %BEARER_TOKEN%' \
--data '{ "type": "template", "project_id": "%ID%",
"substitutions": {
    "start_date": %START_DATE%, 
    "end_date":%END_DATE%, 
    "study_area":%STUDY_AREA%
    }
"includes_geometry": true, 
"generate_thumbnails":true
 }'
```

An example with the substitution fields populated can be seen below.

```bash 
curl --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciO…' \
--data '{ "type": "template", "project_id":"S0rssl3ao8MvsV0gendJ_20230613", 
"substitutions": {
    "start_date":"2021-01-01", 
    "end_date":"2021-12-31"
    }
}'
```

```python
#Python example with no substitutions 
run_id = ebx.create_run("project_id")
print(run_id)
```

```python
#Python example with substitutions
from datetime import datetime
project_id = ""

start_date = ""
end_date = ""

study_area = {
    "type": "FeatureCollection",
    "features": [
        {
        "type": "Feature",
        "properties": {
            "name": ""
        },
        "geometry": {
            "coordinates": [],
            "type": ""
        }
        }
    ]
}

run_id = ebx.create_run(project_id, start_date, end_date, study_area)
print(run_id)
```

This will return a `run_id` which can be used to check the status of the run. 

[Create new run reference](https://dev.api.earthblox.io/docs#/runs/create_run_api_alpha_runs__post)

## Checking the run status

Using the above `run_id`, check the status of your run. 

```bash 

curl --location 'https://api.earthblox.io/v1beta/runs/{run_id}/status' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
status = ebx.get_run_status("run_id")
print(status)
```

A status such as this will be returned. It is likely the first request will return a status of `in_progress`, repeating the request will return a status of `completed` if the workflow ran successfully or `error` if it failed. 

>{"status": "completed"}

[Check run status reference](https://dev.api.earthblox.io/docs#/runs/get_run_status_api_alpha_runs__run_id__status_get)

## List available runs

A list of available runs can be returned. 

```bash
curl --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
runs = ebx.list_runs()
print(runs)
```

This will return information about the runs such as status, id and the time the run was started and completed at. 

[List available runs reference](https://dev.api.earthblox.io/docs#/runs/list_runs_api_alpha_runs__get)

## Get a specified run

The run status and results can be returned for a specific run. 

```bash 
curl --location 'https://api.earthblox.io/v1beta/runs/{run_id}' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
run = ebx.get_run("run_id")
print(run)
```

This will return info about the run such as the map URLs, legend and table outputs.

[Get run reference](https://dev.api.earthblox.io/docs#/runs/get_run_api_alpha_runs__run_id__get)
