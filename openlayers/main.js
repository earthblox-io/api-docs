import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from "ol/source/XYZ";
import OSM from 'ol/source/OSM';
import { transformExtent } from 'ol/proj';

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: new XYZ({
        url: 'https://earthengine.googleapis.com/v1alpha/projects/ebx-trial-dev/maps/3b209ebc23468d71e593d95ffde9f90a-704be12db25ec4d335dd8346b110f7e6/tiles/{z}/{x}/{y}',
      }),
    }),
  ],
  view: new View({
    projection: 'EPSG:3857'
  })
})

const workflowExtent = transformExtent([-4.477366315612024, 56.74097526713954, -2.80027005184459, 57.41065858575106], "EPSG:4326", "EPSG:3857");

map.getView().fit(workflowExtent);


