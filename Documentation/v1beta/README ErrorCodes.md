# Error Codes
Error and Status code can be used in the API to determine the type of errors you have received back from the API. 

## HTTP Status Codes
These are used within the API to indicate an issue with the request.

- 400 : bad request. review the error response for more detail.
- 404 : resource was not found
- 422 : validation error with request data
- 426 : upgrade required, project is not available in the api version. update the project
- 429 : too many requests, try again later you have too many runs in progress or started
- 429 : too many requests, try layer you have requested too many requests per our security settings
- 500 : internal server error
- 502 : denied due to invalid request payload due to security reasons

Upon error with a http status code a json payload will be the response in this format:

```json
{
  "detail": "string"
}
```

## Error Codes on Errored Runs
Runs are asynchronous, when you create a run it is placed into a queue and processed when there is an available worker to process the request. 
After some time the status of the run will change and it could have caused an error. Upon an error state and error code is returned

- 0 : no error occurred
- 1 : indicates the workflow timed out, try again with a bigger scale or smaller area.
- 2 : user error. something in the workflow is not configured correctly or no data was returned from the workflow. Should not be retried without fixing the error in the application.
- 3 : authentication error: something went wrong checking access to the run. do not try again
- 4 : internal error: do not try again.
- 5 : internal error: do not try again.


You may get the error_code by getting the run via its id.
[Get run reference](https://api.earthblox.io/docs#/runs/get_run_v1beta_runs__run_id__get)

```json
{
  "data": {
    "status": "error",
    "error_code": 1,
    "id": "string",
    "started_at": "2024-09-12T15:57:09.786Z",
    "completed_at": "2024-09-12T15:57:09.786Z",
    "exec_parameters": {
      "max_pixels": 0,
      "scale": 0,
      "best_effort": true
    },
    "variables": [],
    "layers": [
      {
        "type": "ImageCollection",
        "title": "string",
        "time_periods": [],
        "bbox": {
          "SW": [],
          "NE": []
        },
        "legend": {
          "type": "gradient",
          "values": []
        }
      }
    ],
    "outputs": [
      {
        "title": "string",
        "type": "Output",
        "df": {},
        "resolution": 0,
        "figure": {}
      }
    ]
  }
}
```