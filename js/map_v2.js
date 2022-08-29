//<![CDATA[                                                                 

var map;
var geocoder;
var product;
var zoomLevel;
var lat;
var lon;
var address;
var latlng;
var myvar;
var mapListener;

function load(action,latitude,longitude) {
//ACTIONS:
//default (on page load, brings up previous cookie)
//reset (clears map and resets view)
//point (sets point to given lat lon)
//clear (clears map only)
	if (GBrowserIsCompatible()) {
		if (action=="default" || action=="reset") {
			map = new GMap2(document.getElementById("map"));
			geocoder = new GClientGeocoder();
			map.setCenter(new GLatLng(49.50, -60.50), 5);
			map.enableScrollWheelZoom();
			map.addMapType(G_PHYSICAL_MAP);
			map.setMapType(G_HYBRID_MAP);
			map.addControl(new GLargeMapControl3D());
			map.addControl(new GMenuMapTypeControl(), new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(64,10)));
			map.clearOverlays();
			
			document.data.n.value = "";
			document.data.w.value = "";
			checkOptions();
			if (action=="default") {
				var myLat = getCookie('lat');
				var myLon = getCookie('lon');
				if (myLat!="" && myLon!="") {
					map.setCenter(new GLatLng(myLat,myLon), 9);
					action = "point";
					latitude = myLat;
					longitude = myLon;
				}
			}
		}

		if (action=="point" && latitude!="" && longitude!=""){
			var latlng = new GLatLng(latitude,longitude);
			var marker = new GMarker(latlng);
			map.clearOverlays();
			map.addOverlay(marker);
			setCookie('lat',latitude);
			setCookie('lon',longitude);
			document.data.n.value = latitude;
			document.data.w.value = longitude;
			checkOptions();
		}
		if (action=="clear") {
			map.clearOverlays();
			document.data.n.value = "";
			document.data.w.value = "";
			checkOptions();
		}
		
		if (!$('#stnCheck').prop('checked') && !mapListener) {
		
			console.log($('#stnCheck').prop('checked'));
			console.log('in load if');
			mapListener = GEvent.addListener(map, "dblclick", function(overlay,latlng) {
				map.clearOverlays();
				map.addOverlay(new GMarker(latlng));
				setCookie('lat',latlng.lat());
				setCookie('lon',latlng.lng());
				document.data.n.value = latlng.lat();
				document.data.w.value = latlng.lng();
				checkOptions();
				document.getElementById('address').value = "";
				document.getElementById('latitude').value = "";
				document.getElementById('longitude').value = "";
				document.getElementById('state_county').selectedIndex = 0;
			});
		}	
	}
}



function submitAddress() {
	val = document.getElementById('address').value;
	var zoomLevel = ""; var lat = ""; var lon = "";
	if (val!="") {
		geocoder.getLatLng(val, function(point) {
			if(!point) {
				alert("ERROR: Address could not be found");
                        } else {
                                lat = point.lat(); lon = point.lng();
                                load('point',lat,lon);
			        map.setCenter(new GLatLng(lat, lon), 7);
				document.getElementById('latitude').value = "";
				document.getElementById('longitude').value = "";
				document.getElementById('state_county').selectedIndex = 0;
			}
		});
	}
	else {
		load('reset','','');
	}
}

function submitLatlon() {
	valLat = document.getElementById('latitude').value;
	valLon = document.getElementById('longitude').value;
	if (valLat!="" && valLon!="") {
		var zoomLevel = ""; var lat = ""; var lon = "";
		lat = Math.abs(valLat * 1);
		lon = Math.abs(valLon * 1) * -1;
		load('point',lat,lon);
		map.setCenter(new GLatLng(lat, lon), 7);
		document.getElementById('address').value = "";
		document.getElementById('state_county').selectedIndex = 0;
	}
	else {
		load('reset','','');
	}
}

function submitCounty() {
	val = document.getElementById('state_county').value;
	var zoomLevel = ""; var lat = ""; var lon = "";
	if (val!="") {
		if (val=="CT") {
			zoomLevel = 8; lat = 41.67; lon = -72.61;
		} else if (val=="ME") {
			zoomLevel = 6; lat = 45.26; lon = -68.97;
		} else if (val=="MA") {
			zoomLevel = 7; lat = 42.21; lon = -71.74;
		} else if (val=="NH") {
			zoomLevel = 6; lat = 43.96; lon = -71.35;
		} else if (val=="NY") {
			zoomLevel = 6; lat = 42.78; lon = -75.69;
		} else if (val=="RI") {
			zoomLevel = 8; lat = 41.69; lon = -71.51;
		} else if (val=="VT") {
			zoomLevel = 6; lat = 43.90; lon = -73.01;
		} else {
			geocoder.getLatLng(val, function(point) {
				if (!point) {
					alert("ERROR: Address could not be found");
				} else {
					lat = point.lat(); lon = point.lng();
					load('point',lat,lon);
					map.setCenter(new GLatLng(lat, lon), 9);
					document.getElementById('address').value = "";
					document.getElementById('latitude').value = "";
					document.getElementById('longitude').value = "";
				}
			});
		}
		if (zoomLevel!="") {
			load('point',lat,lon);
			map.setCenter(new GLatLng(lat, lon), zoomLevel);
			document.getElementById('address').value = "";
			document.getElementById('latitude').value = "";
			document.getElementById('longitude').value = "";
		}
	} else {
		load('reset','','');
	}
}

function markStns(stnCheck) {
  
  
	var xrain_stns = [['BRIDGEPORT SIKORSKY MEM AP', 48.16, -63.13, '060806'], ['DANBURY', 48.4, -63.42, '061762'], ['FALLS VILLAGE', 48.95, -63.37, '062658'], 
				['GROTON', 48.35, -62.04, '063207'], ['NORFOLK 2 SW', 48.97, -63.22, '065445'], ['ROCKY RIVER DAM', 48.58, -63.43, '066966'], ['SHEPAUG DAM', 48.72, -63.3, '067373'], 
				['WEST OTIS', 49.18, -63.22, '199371']] ; 
  	
  	var marker, i; 
  	var myLatLng = {lat: 48.0, lng: -65.0};
	var latlng;
	
	console.log('IN marked stn');
	console.log(myLatLng['lat']);
	console.log(stnCheck.checked);
	
	
	if (stnCheck.checked){
		GEvent.removeListener(mapListener);
		mapListener = null; 
		
		//for (i = 0; i < xrain_stns.length; i++) { //
		
     	// }//
     	 

		load('point',myLatLng['lat'],myLatLng['lng']);
		
			
	}
	else {
		load('reset','','');
	}		
}
