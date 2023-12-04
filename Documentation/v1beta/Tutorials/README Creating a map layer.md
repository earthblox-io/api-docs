
### Get map layers

#### REST

```bash
curl --location 'https://api.earthblox.io/v1beta/runs/{run_id}/layers' \
--header 'Authorization: Bearer %BEARER_TOKEN%'
```
[REST API reference](https://api.earthblox.io/docs#/runs/get_run_layers_api_alpha_runs__run_id__layers_get)


#### Python Client

```
run = ebx.get_run(run_id)
#print all map layers
print(run.layers)
```

### Get map url

The results of this request can be taken and used to display the map tiles elsewhere with the `mapURL` and `bbox`.

#### REST

```
TODO
```

#### Pthon client
```
# get map url for a specific layer and time period:
map_url = run.layers[0]['time_periods'][0]['mapURL']
```

> [!NOTE]
> mapURLs expire after ~24hrs

## Using layers in web maps
### OpenLayers

The openLayers [documentation](https://openlayers.org/doc/quickstart.html) explains how to set up a basic web map. 

Once you have a web map set up the `mapURL` obtained from the API can be used as a `TileLayer` while the `bbox` can be used to set the `extent`, see the examples below.

```javascript
new TileLayer({
      source: %mapURL%,
    }),
```

```javascript
new View({
      extent: %bbox%
    }),
```

### Leafmap (python)

Add map layer using Earth Blox layer output url:

```
import leafmap
m = leafmap.Map(center=(54.85, -1.91), zoom=6, height="400px", width="800px")

m.add_tile_layer(
    url=run.layers[0]['time_periods'][0]['mapURL'],
    name="Reference NDVI",
    attribution="Earth Blox",
)
m.add_layer_control()
m
```

[Leafmap reference](https://leafmap.org/notebooks/00_key_features)




### Leaflet 

The Leaflet [Quick Start Guide](https://leafletjs.com/examples/quick-start/) explains the steps required to create a basic web map. 

Similar to openLayers, once you have a webmap set up the `mapURL` can be used as a `tileLayer`, see the example below. 

```javascript
var map = L.map('map')
L.tileLayer('%mapURL%').addTo(map);
```

### Google Maps Platform Javascript API

There are several pre-requisities associated with using the map outputs with Google Maps. These include: 
1. A project with billing enabled and the `Maps JavaScript API` enabled. 
2. An API key associated with the account. 

See the [documentation](https://developers.google.com/maps/documentation/javascript/overview) on how to achieve this and create a basic web map. 

Once you have a web map set up, the `mapURL` can be used as an `ImageMapType` layer. See the example below. 

```javascript
const mapURL = '%mapURL%'; 
const mapURLLayer = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
        return mapURL.replace('{z}', zoom).replace('{x}', coord.x).replace('{y}', coord.y);
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 12,
    minZoom: 5,
});

map.overlayMapTypes.push(mapURLLayer);
```
