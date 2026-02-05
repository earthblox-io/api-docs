# Using variables in portfolio analysis 

In order to complete any of the requests in these tutorials, a bearer token is required. See the [Authentication page](../README%20Authentication.md) for more details on how to generate one. 

Geojson can be used in variables to replace uploaded portfolios in workflows. 

There are a few prerequisites associated with doing this, these are: 

* The geojson you intend to use a variable should include the properties in the original uploaded portfolio. These should have the same name and type. 
* The name of the variable must be the same as the table_id for the table used in the workflow. This can be found in the table block selections in the portfolio json. This allows for the correct table data to be substituted with your variable if there are multiple table blocks/variables. 

Steps: 
1. Obtain the portfolio json for the workflow you wish to run.  
2. Construct a variable using your geojson it should include: 

**name**: Required - Must be the table_id, this will be "protected..." 

**data_type**: Required - Must be "featurecollection"

**default_value**: Required - This will be your geojson

**description**: Optional

**_comment**: Optional 

Example:

```json
{
    "name" : "protected_TABLE%", 
    "description": "a test variable using a geojson as a dataset", 
    "data_type" : "featureCollection", 
    "_comment": "", 
    "default_value" :{"%GEOJSON%"} 
} 
```
3. Add the variable to the variables array in the portfolio json. 
4. Create request to the POST runs endpoint. 

Example:
 
```bash 
curl --location 'https://api.earthblox.io/v1beta/runs/' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer %BEARER_TOKEN%' \
--data '{ 
"type": "portfolio",
"variables": [ %VARIABLE%]
}' 
```
