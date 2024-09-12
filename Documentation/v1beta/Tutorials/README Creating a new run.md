# Creating a new run

In order to complete any of the requests in these tutorials, a bearer token is required. See the [Authentication page](../README%20Authentication.md) for more details on how to generate one. 

Links to the reference docs can be found throughout this tutorial. 

Examples of both curl requests and the python client are provided. 

## Creating a new run from a project id

Once you have a list of projects, a new run can be created using a project id setting the type to `template`. 

Optionally you have the ability to set variables on a project if they have been defined in a project. You can verify if a project has variables by requesting the project details, it will list out the variables and their settings. If the variable are not overriden in the run document request the defaults on the project will be used.

Variables that can be used within a project/run are:

- **Area** This allows for the replacment of GeoJSON or uploaded assets to be used within a project. We support Polygon, Point, MultiPoint, MultiPolygon and FeatureCollections of the same types as a value for the variables. If the value is a string it will denote that you would like to use an uploaded asset as the variable. The asset ids can be viewable in the url when reviewing the asset on the Earth Blox application e.g. protected_29c28417-68ce-4561-94a6-e77634a75bc9 
- **Date** This allows for a single date to be replaced in the project. use an ISO-8601 format
- **Date Range** This allows for a start and end date to be set. These variables are used within time period blocks to allow easy selection of start and end dates within a project. Note the format of the value will be `{"start_date":"2024-09-12T13:21:51.89","end_date":"2024-10-12T13:21:51.89"}`

`exec_parameters` can also be set on a run request to adjust various parameters to help you scale your project against larger or smaller areas of interest you may be using.

Exec Parameters that can be set are:

- **scale** Sets the scale (in meters) of each pixel to be processed, the bigger the scale the quicker the project will run. However results could not be as accurate. If using a larger area of interest consider using a larger scale
- **best_effort** This is a boolean to use best effort. If the polygon would contain too many pixels at the given scale, compute and use a larger scale which would allow the operation to succeed.
- **max_pixels** - The maximum number of pixels to process in a project. This is a safeguard to not processes to many pixels that could increase costs unintentionally


Other parameters can be set if you would like include geometry in any table outputs using `includes_geometry = true` and if you would like to generate a thumbnail of the output `generate_thumbnails: true`. These are also not required. 

```bash 
curl --request POST --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer %BEARER_TOKEN%' \
--data '{ "type": "template", "project_id": "%ID%",
"includes_geometry": true, 
"generate_thumbnails":true
 }'
```

An example with the variables and exec_parameters can be seen below.

```bash 
curl --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciO…' \
--data '{ 
"type": "template",
"project_id":"S0rssl3ao8MvsV0gendJ_20230613", 
"exec_parameters": {
    "scale":150
},
"variables": [
        {
            "key": "var_1",
            "type": "area",
            "name": "Study Area",
            "description": null,
            "value": {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Polygon",
                            "coordinates": [
                                [
                                    [
                                        33.63669076918691,
                                        10.602354976086843
                                    ],
                                    [
                                        33.63669076918691,
                                        10.229380842614006
                                    ],
                                    [
                                        33.921108694763745,
                                        10.229380842614006
                                    ],
                                    [
                                        33.921108694763745,
                                        10.602354976086843
                                    ],
                                    [
                                        33.63669076918691,
                                        10.602354976086843
                                    ]
                                ]
                            ]
                        },
                        "properties": {}
                    }
                ]
            }
        },
        {
            "key": "var_2",
            "type": "date range",
            "name": "Study Date",
            "value": {
                "start_date": "2020-01-01T00:00:00",
                "end_date": "2021-12-31T00:00:00"
            }
        },
        {
            "key": "var_3",
            "type": "date",
            "name": "Other Date",
            "value": "2020-01-01T00:00:00"
        }
    ]
}'
```

```python
#Python example with no substitutions 
run_id = ebx.create_run(ebx.ProjectSpec(project_id="project_id"))
print(run_id)
```

```python
#Python example with substitutions
STUDY_AREA = {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
          [
            [
              33.63669076918691,
              10.602354976086843
            ],
            [
              33.63669076918691,
              10.229380842614006
            ],
            [
              33.921108694763745,
              10.229380842614006
            ],
            [
              33.921108694763745,
              10.602354976086843
            ],
            [
              33.63669076918691,
              10.602354976086843
            ]
          ]
        ]
    },
    "properties": {}
}
# Dates must be ISO Format
START_DATE = "2020-01-01T00:00:00"
END_DATE = "2021-12-31T00:00:00"

# Exec Parameters
EXEC_PARAMETERS = {
    "best_effort": False,
    #"max_pixels": 10e9,
    "scale": 100 # meters
}

# Variables
# Variables can be one of ("area", "date", "date range")
VAR1 = {
  "key":"var_1", # can get from requesting the project info
  "type":"area", # can get from requesting the project info
  "value":STUDY_AREA
}

VAR2 = {
  "key":"var_2",
  "type":"date range",
  "value":{
    "start_date":START_DATE,
    "end_date": END_DATE
  }
}

project_spec = ebx.ProjectSpec(**{
    "project_id":PROJECT_ID,
    "type": "template",
    "variables": [VAR1, VAR2],
    "exec_parameters": EXEC_PARAMETERS
})

RUN_ID = ebx.create_run(project_spec)
print(RUN_ID)
```

This will return a `run_id` which can be used to check the status of the run. 

[Create new run reference](https://api.earthblox.io/docs#/runs/create_run_v1beta_runs__post)

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

[Check run status reference](https://api.earthblox.io/docs#/runs/get_run_status_v1beta_runs__run_id__status_get)

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

[List available runs reference](https://api.earthblox.io/docs#/runs/list_runs_v1beta_runs__get)

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

[Get run reference](https://api.earthblox.io/docs#/runs/get_run_v1beta_runs__run_id__get)
