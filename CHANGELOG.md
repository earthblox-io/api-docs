# 2023-09-10 - v1beta

Updates to the API to introduce variables and exec paramters to be added to runs to allow for dynamic projects.
Various standardisations introduced to requests and response parameters, for all endpoints.

- Updated Access Token Requests to accept Basic auth Authorization header to send over client_id and client_secret
- Update Access Token response to rename `token` parameter to `access_token`, rename `expires` to `expires_at`
- Wrap all successful responses with `data` e.g. `{"data": { "id": "..." } }` 
- Add in Variable Support for projects and runs
- Add in Execution Parameter support for project and runs
- Standardisation of parameters
- Fix authenication setup of the swagger documentation
- Add error_code to runs
- Add missing error status codes from swagger documentation
- de-nest layers, tables, outputs and chart requests. data parameter will now be an array of these layers
- filter by title for projects list
- added rate limiting for maximum number of concurrent runs in progress
- outputs, layers, charts, table endpoints have a meta parameter on the response to list the run status.
- depreciate substitutions