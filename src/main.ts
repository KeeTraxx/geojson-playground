import 'css-init'
import './style.css'
import * as d3 from 'd3';
import allCantons from '../data/ch-cantons.json';
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3';

// geoMercator converts from WGS85 to 2d screen coordinates
const projection = d3.geoMercator();

// geoPath can generate <path d="xxx"> commands
const pathDrawer = d3.geoPath(projection);

// fit the FeatureCollection inside a rectangle of 640x480
projection.fitSize([640, 480], allCantons as ExtendedFeatureCollection);

// add new path elements using d3
d3.select('g.layer-cantons') // select group element
  .selectAll('path') // select all path elements
  .data(allCantons.features) // set data on all path elements
  .join('path') // append a <path> element per element of the array
  .attr('d', d => pathDrawer(d as ExtendedFeature)) // set the 'd' attribute of the path element using
  .attr('fill', (_, i) => d3.schemeCategory10[i % d3.schemeCategory10.length]); // fill with a color


/*
const person = {
  "type": "Feature",
  "id": "1",
  "geometry": {
    "type": "Point",
    "coordinates": [7.464515227133352, 46.968762838999965]
  },
  "properties": {
    "name": "Some guy",
    "shoeSize": 42
  }
}

d3.select('g.layer-persons') // select group element
  .selectAll('path') // select all path elements
  .data([person]) // set data on all path elements
  .join('path') // append a <path> element per element of the array
  .attr('d', d => pathDrawer(d as ExtendedFeature)); // set the 'd' attribute of the path element using

  */