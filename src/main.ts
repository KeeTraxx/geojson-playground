import 'css-init'
import './style.css'
import * as d3 from 'd3';
import allCantons from '../data/ch-cantons.json';
import allLakes from '../data/ch-lakes.json';
import { ExtendedFeature, ExtendedFeatureCollection } from 'd3';

// geoMercator converts from WGS85 to 2d screen coordinates
const projection = d3.geoMercator();

// geoPath can generate <path d="xxx"> commands
const pathDrawer = d3.geoPath(projection)
.pointRadius(3); // circle size for "Point" geometries

// fit the FeatureCollection inside a rectangle of 640x480
projection.fitSize([640, 480], allCantons as ExtendedFeatureCollection);

// add new path elements using d3
d3.select('g.layer-cantons') // select group element
.selectAll('path') // select all path elements
.data(allCantons.features) // set data on all path elements
.join('path') // append a <path> element per element of the array
.attr('d', feature => pathDrawer(feature as ExtendedFeature)) // set the 'd' attribute of the path element using
.attr('fill', (_, i) => d3.schemeCategory10[i % d3.schemeCategory10.length]); // fill with a color

// Exercise 1: draw all lakes from ../data/ch-lakes.json
// hint: make a new layer in index.html
d3.select('g.layer-lakes')
.selectAll('path')
.data(allLakes.features)
.join('path')
.attr('d', feature => pathDrawer(feature as ExtendedFeature));

// Exercise 1a: click / hover on lake will display its name to the <aside> element
// hint: use .on('click', (event, feature) => d3.select('aside').text('hello world'))

// Exercise 2: draw the following GeoJSON Feature using pathDrawer
const truesselStrasse2 = {
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

d3.select('g.layer-other')
.selectAll('path')
.data([truesselStrasse2])
.join('path')
.attr('d', feature => pathDrawer(feature as ExtendedFeature));

// Exercise 2a: draw a symbol instead using d3.symbol()
const triangleSymbolDrawer = d3.symbol().type(d3.symbolTriangle).size(100);

d3.select('g.layer-symbols')
.selectAll('path')
.data([truesselStrasse2])
.join('path')
.attr('transform', feature => `translate(${projection((feature.geometry).coordinates as [number, number])})`)
.attr('d', () => triangleSymbolDrawer());


// Exercise 3: add labels to cantons
// hint: use path pathDrawer.centroid() to find the center of a GeoJSON Feature
d3.select('g.layer-canton-labels')
.selectAll('text')
.data(allCantons.features)
.join('text')
.attr('transform', feature => `translate(${pathDrawer.centroid(feature as ExtendedFeature)})`)
.text(feature => feature.properties.name);

// Exercise 4: draw the path in ../data/path-from-bern-to-thun.json

// Exercise 4a: find out the point at 15km of the hike and draw that point
