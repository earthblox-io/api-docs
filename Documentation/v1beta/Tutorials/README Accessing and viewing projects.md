# Accessing and viewing projects

In order to complete any of the requests in these tutorials, a bearer token is required. See the [Authentication page](../README%20Authentication.md) for more details on how to generate one. 

Links to the reference docs can be found throughout this tutorial. 

Examples of both curl requests and the python client are provided. 

All your available projects can be accessed and listed with the following request. This will return details such as the `project_id`, `name` and `description`.

```bash 
curl --location 'https://dev.api.earthblox.io/api/alpha/projects/' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
#Python example
projects = ebx.list_projects()
print(projects)
 ```
[List projects reference](https://dev.api.earthblox.io/docs#/projects/list_projects_api_alpha_projects__get)

The `project_id` returned by the previous request can be used to get a specific project and list the same details.

```bash 
curl --location 'https://dev.api.earthblox.io/api/alpha/projects/{project_id}' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```

```python
#Python example
project_id = ""
my_project = ebx.get_project(project_id)
print(my_project)
```

[Get project reference](https://dev.api.earthblox.io/docs#/projects/get_project_api_alpha_projects__project_id__get)