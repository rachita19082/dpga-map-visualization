import React, { useRef, useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker, Popup, ZoomControl } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

const zoomDefault = 1;

const Map = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  maxZoom: 5,
  minZoom: 0
});

export default function mapComponent(props) {

	const [zoom, setZoom] = useState(zoomDefault);
	const [lonLat, setLonLat] = useState([props.lon, props.lat]);
	const [lonLatMarker, setLonLatMarker] = useState([props.lon, props.lat]);

	// useEffect(() => {
	// 	setZoom(zoomDefault);
	// 	setLonLat([props.lon, props.lat]);
	// 	setLonLatMarker([props.lon, props.lat]);
	// }, [props.lon, props.lat]);

	return (
		<Map
			style="mapbox://styles/mapbox/light-v9"
			center= {lonLat}
			zoom={[zoom]}
			containerStyle={{ width: '100%', height: '100%' }}
			movingMethod='jumpTo'
			logoPosition='bottom-right'
			onMoveEnd={(map) => {
					setZoom(map.getZoom());
					setLonLat([map.getCenter().lng, map.getCenter().lat]);
					console.log(map.getCenter().lng, map.getCenter().lat)
				}
			}
			onStyleLoad={(map, loadEvent) => {

                var layers = map.getStyle().layers;
                // Find the index of the first symbol layer in the map style
                var firstSymbolId;
                for (var i = 0; i < layers.length; i++) {
                    if (layers[i].type === 'symbol') {
                        firstSymbolId = layers[i].id;
                        break;
                    }
                }

                map.addLayer({
                    // adding a layer containing the tileset with country boundaries
                    id: 'Development Countries', //this is the name of our layer, which we will need later
                    source: {
                      type: 'vector',
                      url: 'mapbox://rachita-saha.a0vjjfm1', 
                    },
                    'source-layer': 'ne_10m_admin_0_countries-2c5j3w', 
                    type: 'fill',
                    paint: {
                      // 'fill-color': '#db3d44', // this is the color you want your tileset to have (red)
                      'fill-color': '#1CABE2', //this helps us distinguish individual countries a bit better by giving them an outline
                      'fill-opacity': 0.6,
                    },
                }, firstSymbolId)
                map.setLayoutProperty('Development Countries', 'visibility', 'visible');

                map.setFilter(
                    'Development Countries',
                    ['in', 'ADM0_A3_IS'].concat(['NOR']),
                    //['in', 'ADM0_A3_IS'].concat(Object.keys(props.fundCountries)),
                  ); // This line lets us filter by country codes.


                // Ref: https://dev.to/wuz/building-a-country-highlighting-tool-with-mapbox-2kbh
                map.addLayer({
                  // adding a layer containing the tileset with country boundaries
                  id: 'Deployment Countries', //this is the name of our layer, which we will need later
                  source: {
                    type: 'vector',
                    url: 'mapbox://rachita-saha.a0vjjfm1', 
                  },
                  'source-layer': 'ne_10m_admin_0_countries-2c5j3w', 
                  type: 'fill',
                  paint: {
                    'fill-color': '#db3d44', // this is the color you want your tileset to have (red)
                    // 'fill-outline-color': '#F2F2F2', //this helps us distinguish individual countries a bit better by giving them an outline
                    //"fill-pattern": "grey-lines",
                    'fill-opacity': 0.3,
                  },
                }, firstSymbolId)
                map.setLayoutProperty('Deployment Countries', 'visibility', 'visible');

                map.setFilter(
                    'Deployment Countries',
                    /*[
                      "in",
                      "iso_3166_1_alpha_3",
                      'IND',
                      'KHM'
                    ]*/
                    ['in', 'ADM0_A3_IS'].concat(['IND', 'NOR', 'SWE']),
                    //['in', 'ADM0_A3_IS'].concat(Object.keys(props.gigaCountries)),
                  ); // This line lets us filter by country codes.
                  
                  

              /* map.addLayer({
                    // adding a layer containing the tileset with country boundaries
                    id: 'ProCo Countries', //this is the name of our layer, which we will need later
                    source: {
                      type: 'vector',
                      url: 'mapbox://lacabra00.dvl2fpqx', 
                    },
                    'source-layer': 'ne_10m_admin_0_countries-arkt75', 
                    type: 'fill',
                    paint: {
                      'fill-color': 'yellow', //this helps us distinguish individual countries a bit better by giving them an outline
                      'fill-opacity': 0.2,
                    },
                }, firstSymbolId)
                map.setLayoutProperty('ProCo Countries', 'visibility', 'visible');

                map.setFilter(
                    'ProCo Countries',
                    ['in', 'ADM0_A3_IS'].concat(Object.keys(props.procoCountries)),
                  ); // This line lets us filter by country codes.

                map.addLayer({
                    // adding a layer containing the tileset with country boundaries
                    id: 'DPG Pathfinders', //this is the name of our layer, which we will need later
                    source: {
                      type: 'vector',
                      url: 'mapbox://lacabra00.dvl2fpqx', 
                    },
                    'source-layer': 'ne_10m_admin_0_countries-arkt75', 
                    type: 'fill',
                    paint: {
                       "fill-pattern": "grey-lines",
                    },
                }, firstSymbolId)
                map.setLayoutProperty('DPG Pathfinders', 'visibility', 'visible');

                map.setFilter(
                    'DPG Pathfinders',
                    ['in', 'ADM0_A3_IS'].concat(Object.keys(props.pathfinderCountries)),
                  ); // This line lets us filter by country codes.
                  

                map.addLayer({
                    // adding a layer containing the tileset with country boundaries
                    id: 'countries', //this is the name of our layer, which we will need later
                    source: {
                      type: 'vector',
                      url: 'mapbox://lacabra00.dvl2fpqx', 
                    },
                    'source-layer': 'ne_10m_admin_0_countries-arkt75', 
                    type: 'fill',
                    paint: {
                      'fill-color': 'white', //this helps us distinguish individual countries a bit better by giving them an outline
                      'fill-opacity': 0,
                    },
                }, firstSymbolId)

                map.setFilter(
                    'countries',
                    ['in', 'ADM0_A3_IS'].concat(Object.keys(props.countries)),
                  ); // This line lets us filter by country codes.
                  */

			/*map.on('click', 'countries', function(mapElement) {
    				const countryCode = mapElement.features[0].properties.ADM0_A3_IS; // Grab the country code from the map properties.

    				let countryName = '';
    				let gigaHtml = '';
    				let pathHtml = '';
    				let fundHtml = '';
    				let procoHtml = '';

    				if(props.countries[countryCode].giga){
    					countryName = props.countries[countryCode].giga.country;
    					gigaHtml = '✅&nbsp;&nbsp;GIGA Country<br/>';
    					if(props.countries[countryCode].giga.link) {
    						gigaHtml += '<ul><li><a href="' + props.countries[countryCode].giga.link + '" target="_blank">More info</a></li></ul>';
    					}
    				}

    				console.log()
    				if(props.countries[countryCode].proco){
    					countryName = props.countries[countryCode].proco.country;
    					procoHtml = '✅&nbsp;&nbsp;Project Connect<br/>';
    					procoHtml += '<ul>';
    					procoHtml += '<li><b>Location Data</b>: '+props.countries[countryCode].proco.location + '</li>';
    					procoHtml += '<li><b>Connectivity Data</b>: '+props.countries[countryCode].proco.connectivity + "</li>";
    					procoHtml += '</ul>';
    				}

    				if(props.countries[countryCode].pathfinder) {
    					countryName = props.countries[countryCode].pathfinder.country;
    					pathHtml = "✅&nbsp;&nbsp;DPG Pathfinder Country<br/>";
    					pathHtml += "<ul>";
    					pathHtml += "<li><b>Status:</b> " + props.countries[countryCode].pathfinder.status + "</li>";
    					if(props.countries[countryCode].pathfinder.sector) {
    						pathHtml += "<li><b>Sector:</b> " + props.countries[countryCode].pathfinder.sector + "</li>";
    					}
    					if(props.countries[countryCode].pathfinder.comments) {
    						pathHtml += "<li><b>Comments:</b> " + props.countries[countryCode].pathfinder.comments + "</li>";
    					}
    					pathHtml += "</ul>";
    				}
    				if(props.countries[countryCode].fund) {
    					countryName = props.countries[countryCode].fund.country;
    					fundHtml = "✅&nbsp;&nbsp;Venture Fund Investments<br/>";
    					fundHtml += "<ul>";
    					for(let i=0; i < props.countries[countryCode].fund.investments.length; i++) {
    						fundHtml += "<li>"+props.countries[countryCode].fund.investments[i].investment
    						if(props.countries[countryCode].fund.investments[i].co) {
    							fundHtml += "&nbsp;🌐"
    						}
    						fundHtml += "</li>";
    					}
    					fundHtml += "</ul>";
    				}

    				var html = `<h3>${countryName}</h3>
    				${gigaHtml}
    				${procoHtml}
    				${pathHtml}
    				${fundHtml}`;

			        new mapboxgl.Popup() //Create a new popup
			          .setLngLat(mapElement.lngLat) // Set where we want it to appear (where we clicked)
			          .setHTML(html) // Add the HTML we just made to the popup
			          .addTo(map); // Add the popup to the map

                });*/

                // enumerate ids of the layers
                var toggleableLayerIds = ['Development Countries', 'Deployment Countries'];
                
                var done = 0
                // set up the corresponding toggle button for each layer
              if(done == 0) {
                for (var i = 0; i < toggleableLayerIds.length; i++) {
                    var id = toggleableLayerIds[i];
                    done = 1;

                    var link = document.createElement('a');
                    link.href = '#';
                    link.className = 'active';
                    link.textContent = id;
                     
                    link.onclick = function (e) {
                        var clickedLayer = this.textContent;
                        e.preventDefault();
                        e.stopPropagation();
                         
                        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                         
                        // toggle layer visibility by changing the layout object's visibility property
                        if (visibility === 'visible') {
                            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                            this.className = '';
                        } else {
                            this.className = 'active';
                            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                        }
                    };
                 
                    var layers = document.getElementById('menu');

                    var li = document.createElement('li');
                    li.appendChild(link);

                    layers.appendChild(li);
                }
              }

			}}
		>

			<ZoomControl/>
		</Map>
	);
}