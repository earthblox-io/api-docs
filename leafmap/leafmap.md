#### Leafmap example: 



Print the (first) map layer for (first) time period from the workflow execution run

(see [Creating a new run / Workflow execution](https://github.com/earthblox-io/api-docs/blob/main/Documentation/v1beta/Tutorials/README%20Creating%20a%20new%20run.md) for more details)

```
run = ebx.get_run(run_id)
print(run.layers[0]['time_periods'][0]['mapURL'])
```

Import leafmap: 
   
`import leafmap`

Add Leafmap map:

`m = leafmap.Map(center=(54.85, -1.91), zoom=6, height="400px", width="800px")`

Add map layer using Earth Blox layer output url:

```
m.add_tile_layer(
    url=run.layers[0]['time_periods'][0]['mapURL'],
    name="Reference NDVI",
    attribution="Earth Blox",
)
m.add_layer_control()
m
```

[Leafmap reference](https://leafmap.org/notebooks/00_key_features)
