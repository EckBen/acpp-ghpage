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
var position;
var arrInfoWindow = [];
var stn_name;
var stn_id;
var rec_leng;
var rec_per;
var stn_elev;
var marker;
var markers = new Array();

stn_name = 'Click Marker to Select';

function deleteOverlays() {
  console.log('in delete overlay')
  if (markers) {
     console.log('markers')
     console.log(markers)
     console.log(markers[0])
    for (i in markers) {
     markers[i].setMap(null);
    }
    markers.length = 0;
  }
  console.log('exiting delete')
}

function load(action,position,zoomVal) {
//ACTIONS:
//default (on page load, brings up previous cookie)
//reset (clears map and resets view)
//point (sets point to given lat lon)
//clear (clears map only)
//
       console.log('I am in load');
       console.log(action);
	
        document.querySelector('#stn_content').innerHTML = stn_name;

	if (zoomVal==''){
		zoomVal = 5;
		}
	console.log('zoomVal');
	console.log(zoomVal);
	console.log('in load');
		if (action=="default" || action=="reset") {
			console.log('Place 1');
			console.log(action)
			 map = new google.maps.Map(document.getElementById('map'), {
    				center: {lat: 49.50, lng: -60.50},
    				zoom: zoomVal,
				mapTypeId: google.maps.MapTypeId.HYBRID
  			});	
//		map = new google.maps.Map(document.getElementById("map"));
//			map.setCenter(new google.maps.LatLng(49.50, -60.50), 5);
//			map.mapTypeId.google.maps.MapTypeId.HYBRID;
	
			console.log(map)	
			console.log('place 2');
			geocoder = new google.maps.Geocoder();
//			map.enableScrollWheelZoom();   Enabled by default in v3
//			map.addMapType(G_PHYSICAL_MAP);
//			map.setMapType(G_HYBRID_MAP);
//			map.addControl(new GLargeMapControl3D());
//			map.addControl(new GMenuMapTypeControl(), new GControlPosition(G_ANCHOR_TOP_LEFT, new GSize(64,10)));
			deleteOverlays();
			
		//	document.data.n.value = "";
		//	document.data.w.value = "";
		//	checkOptions();
		
			if (action=="default") {
				console.log('second defaul if');
				var myLat = "" //getCookie('lat');
				var myLon = "" //getCookie('lon');
				console.log('default');
				console.log(myLon);
				if (myLat!="" && myLon!="") {
					map.setCenter(new google.maps.LatLng(myLat,myLon), 9);
					action = "point";
					latitude = parseFloat(myLat);
					longitude = parseFloat(myLon);
					console.log(longitude);
					console.log(latitude);
					console.log(typeof latitude);
					console.log(typeof longitude);
					position = {lat:latitude, lng:longitude};
				}
			/*	mapListener = google.maps.event.addListener(map, "dblclick", function(event) {
                                load('point',event.latLng,'');
				setCookie('lat',event.latLng.lat());
                                setCookie('lon',event.latLng.lng());
                                document.data.n.value = event.latLng.lat();
                                document.data.w.value = event.latLng.lng();
                                checkOptions();
                                document.getElementById('address').value = "";
                                document.getElementById('latitude').value = "";
                                document.getElementById('longitude').value = "";
                                document.getElementById('state_county').selectedIndex = 0;
			});*/
				markStns(this,' ');
		
		}

		}
		if (action=="point"){
			console.log('pointing');
			console.log(typeof position);
//			if (!typeof position === 'undefined' || !position === null) {
			console.log('position');
			console.log(position);
			
			deleteOverlays();
			map.setCenter(position);
			map.setZoom(zoomVal);
			markers.push(new google.maps.Marker({
				map:map,
				position:position
				}));
			console.log('after push');
			console.log(position.lat);
			console.log(position.lng);
			console.log('point cookies');
			//map.addOverlay(marker);
			//setCookie('lat',position.lat);
			//setCookie('lon',position.lng);
			document.data.n.value = position.lat;
			document.data.w.value = position.lng;
			checkOptions();
//		}
	      }

		if (action=="stn_point"){
			map.setCenter(position);
			map.setZoom(zoomVal);
			//setCookie('lat',position.lat);
			//setCookie('lon',position.lng);
			document.data.n.value = position.lat;
			document.data.w.value = position.lng;
			checkOptions();
		}

		if (action=="clear") {
			map.clearOverlays();
			document.data.n.value = "";
			document.data.w.value = "";
			checkOptions();
		}
	
		console.log('before gridCheck');
		console.log(mapListener);
        console.log($('#gridCheck').prop('checked'));
	
		if ($('#gridCheck').prop('checked') && !mapListener) {
		
			console.log($('#gridCheck').prop('checked'));
			console.log('in load if');
			mapListener = google.maps.event.addListener(map, "dblclick", function(event) {
                                console.log('before going to load');
				load('point',event.latLng,'');
				console.log('before overlay delete');
			//	deleteOverlays();
				console.log('deleted overlays in if')
				console.log('double click cookies')
				console.log(event.latLng.lat())
				console.log(event.latLng.lng())
			//	map.addOverlay(new GMarker(latlng));
			//	setCookie('lat',event.latLng.lat());
			//	setCookie('lon',event.latLng.lng());
				document.data.n.value = event.latLng.lat();
				document.data.w.value = event.latLng.lng();
				checkOptions();
				document.getElementById('address').value = "";
				document.getElementById('latitude').value = "";
				document.getElementById('longitude').value = "";
				document.getElementById('state_county').selectedIndex = 0;
			});
                        console.log('added listener');
                        console.log(mapListener);
		} /*else if (!mapListener){
			markStns(this,' ')};*/	
}

function submitAddress() {
	var address = document.getElementById('address').value+',Canada';
	var zoomLevel = ""; var lat = ""; var lon = "";
	if (address!="") {
		console.log(address);
		geocoder.geocode({'address':address}, function(results,status) {
		console.log(results[0].geometry);
		if (status === google.maps.GeocoderStatus.OK) {
//			map.setCenter(results[0].geometry.location);
//			var marker = new google.maps.Marker({
//			map:map,
//			position: results[0].geometry.location
			document.getElementById("gridCheck").checked = true;
			
			position = {lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()};
			load('point',position,10);
		} else {
					
			alert("ERROR: Address could not be found");
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
		console.log(typeof lat);
		console.log('lat type');
		position = {lat:lat, lng:lon};
//		map.setCenter({lat:lat, lng:lon});
//			var marker = new google.maps.Marker({
//			map:map,
//			position: {lat:lat, lng:lon},
//			zoom:7
//		load('point',position);
//			});
		document.getElementById('address').value = "";
		document.getElementById("gridCheck").checked = true;
		document.getElementById('state_county').selectedIndex = 0;
		
		load('point',position,11);

	}
	else {
		load('reset','','');
	}
}

function submitCounty() {
	val = document.getElementById('state_county').value;
	var zoomLevel = ""; var lat = ""; var lon = "";
	
	console.log(val);
	console.log($('#gridCheck').prop('checked'));
	console.log('County knows about gridcheck');
	if (val!="") {
		if (val=="NB") {
			zoomLevel = 7; position = {lat:46.57, lng:-66.46};
		} else if (val=="NF") {
			zoomLevel = 6; position = {lat:49.13, lng: -56.81};
		} else if (val=="NS") {
			zoomLevel = 6; position = {lat: 44.95, lng: -63.00};
		} else if (val=="PE") {
			zoomLevel = 8; position = {lat: 46.4, lng: -63.42};
		
		} else {
			console.log(val);
			geocoder.geocode({'address':val+ ",Canada"}, function(results,status) {
				console.log(results[0].geometry);
				if (status === google.maps.GeocoderStatus.OK) {
					/*document.getElementById("gridCheck").checked = false;*/
					position = {lat:results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()};
					if($('#gridCheck').prop('checked')==true){
					     console.log('use grid checked');
						load('point',position,9);
					}else {
					    console.log('thinks grid not checked');
					    console.log($('#gridCheck').prop('checked'));
						load('stn_point',position,7);
					};
				} else {
					
					alert("ERROR: Address could not be found");
               }
			});
		}
		
		if (zoomLevel!="") {
			console.log(zoomLevel);
			console.log('ZOOM');
			load('point',position,zoomLevel);
			map.setCenter(position, zoomLevel);
			document.getElementById('address').value = "";
			document.getElementById('latitude').value = "";
			document.getElementById('longitude').value = "";
		}
	} else {
		load('reset','','');
	}
}

function markStns(gridCheck,ams_prod) {
  
   console.log(ams_prod);
   console.log('THIS IS THE PRODUCT');
   
  // I beleive the commented stations are those inQuebec which should not be displayed.
	//var xrain_stns = [["BLANC-SABLON A", "CA007040813", 51.45, -57.18, 37, "1974-2010", 26], ["GRANDE RIVIERE", "CA007052820", 48.38, -64.53, 8, "1967-1997", 21],
	 //               ["LAC HUMQUI", "CA007053649", 48.28, -67.57, 235, "1973-1999", 23], ["NOTRE DAME DU LAC", "CA007055675", 47.6, -68.8, 320, "1985-1999", 12], 
	   //             ["NOUVELLE", "CA007055705", 48.1, -66.3, 7, "1971-1999", 27], ["RIMOUSKI", "CA007056480", 48.45, -68.52, 35, "1964-1999", 25], 
	     //           ["ST ALEXIS DE MATAPEDIA", "CA007056814", 47.98, -67.07, 274, "1981-1998", 15], ["ST CHARLES GARNIER", "CA007056970", 48.33, -68.05, 323, "1970-1993", 21],
	       //          ["ST MODESTE", "CA007057574", 47.85, -69.38, 152, "1974-1984", 11], ["ILES DE LA MADELEINE A", "CA00705C2G9", 47.42, -61.78, 10, "1983-2012", 18],
	         var xrain_stns = [["BEECHWOOD", "CA008100512", 46.53, -67.67, 91, "1959-1969", 10], ["BELLEDUNE", "CA008100514", 47.9, -65.83, 7, "1971-1989", 18], 
	         ["BOUCTOUCHE CDA CS", "CA008100593", 46.43, -64.77, 35, "1982-2017", 20], ["CHARLO AUTO", "CA008100885", 47.99, -66.33, 42, "1959-2017", 57], 
	         ["MIRAMICHI", "CA008100989", 47.01, -65.47, 33, "1964-2017", 39], ["EDMUNDSTON", "CA008101303", 47.42, -68.32, 154, "2005-2017", 13], 
	         ["FREDERICTON A", "CA008101500", 45.87, -66.53, 20, "1984-1994", 11], ["FREDERICTON CDA CS", "CA008101605", 45.92, -66.61, 35, "1959-2017", 53], 
	         ["MISCOU ISLAND (AUT)", "CA008103050", 48.01, -64.49, 4, "2007-2017", 10], ["MONCTON INTL A", "CA008103201", 46.11, -64.68, 70, "1946-2016", 67], 
	         ["ROYAL ROAD", "CA008104480", 46.05, -66.72, 115, "1966-1992", 26], ["ROYAL ROAD WEST", "CA008104482", 46.08, -66.73, 160, "1966-1978", 12], 
	         ["SAINT JOHN", "CA008104800", 45.28, -66.08, 30, "1924-1950", 20], ["SAINT JOHN A", "CA008104900", 45.32, -65.89, 108, "1958-2002", 41], 
	         ["ST. STEPHEN", "CA008104935", 45.21, -67.25, 26, "2005-2017", 12], ["SUMMIT DEPOT", "CA008105100", 47.78, -68.33, 411, "1955-1973", 17], 
	         ["ST LEONARD CS", "CA00810I001", 47.16, -67.83, 245, "1985-2016", 31], ["BACCARO PT", "CA008200255", 43.45, -65.47, 4, "2007-2017", 10], 
	         ["CARIBOU POINT (AUT)", "CA008200774", 45.77, -62.68, 2, "2004-2017", 13], ["DEBERT", "CA008201390", 45.42, -63.47, 37, "2004-2017", 13], 
	         ["EDDY POINT", "CA008201716", 45.52, -61.25, 66, "1972-1985", 14], ["GREENWOOD A", "CA008202000", 44.98, -64.92, 28, "1964-2016", 48], 
	         ["HALIFAX", "CA008202200", 44.65, -63.57, 31, "1941-1973", 23], ["HALIFAX INTL A", "CA008202251", 44.88, -63.51, 145, "1977-2017", 24], 
	         ["INGONISH BEACH RCS", "CA008202502", 46.66, -60.41, 10, "1983-2017", 20], ["KEJIMKUJIK 1", "CA008202592", 44.4, -65.2, 125, "2006-2017", 10], 
	         ["KENTVILLE CDA CS", "CA008202810", 45.07, -64.48, 48, "1960-2016", 46], ["NAPPAN AUTO", "CA008203702", 45.76, -64.24, 19, "2004-2017", 10], 
	         ["UPPER STEWIACKE RCS", "CA008204193", 45.23, -63.06, 23, "2006-2016", 10], ["PARRSBORO", "CA008204402", 45.41, -64.35, 30, "2005-2017", 12], 
	         ["SABLE ISLAND", "CA008204700", 43.93, -60.01, 5, "1962-2013", 52], ["SHARPE BROOK", "CA008205085", 45.02, -64.63, 137, "1968-1977", 10], 
	         ["SHEARWATER RCS", "CA008205092", 44.63, -63.51, 24, "1955-2017", 60], ["SHELBURNE", "CA008205126", 43.72, -65.25, 29, "1973-1988", 16], 
	         ["SYDNEY CS", "CA008205702", 46.16, -60.04, 62, "1961-2016", 53], ["TRURO", "CA008205990", 45.37, -63.27, 39, "1958-2001", 27], 
	         ["WESTERN HEAD", "CA008206240", 43.99, -64.66, 10, "1970-2017", 19], ["YARMOUTH A", "CA008206495", 43.83, -66.09, 42, "1971-2016", 45], 
	         ["CHARLOTTETOWN A", "CA008300301", 46.29, -63.12, 48, "1967-2016", 32], ["ST. PETERS", "CA008300562", 46.45, -62.58, 29, "2004-2017", 13], 
	         ["SUMMERSIDE", "CA008300596", 46.44, -63.84, 12, "1964-2013", 37], ["MAPLE PLAINS", "CA008305500", 46.3, -63.58, 45, "2002-2017", 13], 
	         ["HARRINGTON CDA CS", "CA00830P001", 46.34, -63.17, 53, "2000-2016", 16], ["ARGENTIA (AUT)", "CA008400104", 47.29, -53.99, 19, "1980-2013", 17], [
	         "BADGER (AUT)", "CA008400301", 48.97, -56.07, 102, "2006-2017", 11], ["BURGEO NL", "CA008400801", 47.62, -57.62, 10, "1967-2013", 34], 
	         ["COMFORT COVE", "CA008401259", 49.27, -54.88, 99, "1967-1995", 28], ["DANIELS HARBOUR", "CA008401400", 50.24, -57.58, 19, "1969-1995", 27], 
	         ["DEER LAKE A", "CA008401501", 49.22, -57.4, 21, "1966-2002", 36], ["GANDER AIRPORT CS", "CA008401705", 48.95, -54.57, 151, "1939-2017", 72], 
	         ["LA SCIE", "CA008402520", 49.92, -55.67, 194, "1984-1995", 12], ["PORT AUX BASQUES", "CA008402975", 47.57, -59.15, 39, "1975-1996", 20], 
	         ["ST ALBANS", "CA008403290", 47.87, -55.85, 13, "1969-1983", 14], ["ST ANTHONY", "CA008403401", 51.37, -55.6, 11, "1971-1995", 23], 
	         ["ST JOHN'S A", "CA008403506", 47.62, -52.74, 140, "1949-1996", 36], ["ST LAWRENCE", "CA008403619", 46.92, -55.38, 48, "1969-2017", 41], 
	         ["STEPHENVILLE RCS", "CA008403820", 48.56, -58.57, 58, "1967-2017", 49], ["TWILLINGATE (AUT)", "CA008404025", 49.68, -54.8, 92, "2004-2017", 14], 
	         ["BATTLE HARBOUR LOR", "CA008500398", 52.25, -55.6, 9, "1972-1983", 11], ["CHURCHILL FALLS A", "CA008501132", 53.55, -64.1, 439, "1969-1992", 23], 
	         ["GOOSE A", "CA008501900", 53.32, -60.42, 48, "1961-2016", 54], ["HOPEDALE (AUT)", "CA008502400", 55.45, -60.22, 11, "2005-2017", 11], 
	         ["MARY'S HARBOUR A", "CA008502591", 52.3, -55.83, 10, "1983-1995", 12], ["NAIN", "CA008502799", 56.55, -61.68, 7, "1993-2016", 21], 
	         ["WABUSH LAKE A", "CA008504175", 52.93, -66.87, 551, "1974-2003", 27]];
	                      
	                      //["ALLAGASH", "USC00170200", 47.09, -69.03, 182, "1975-2012", 24], ["CARIBOU MUNI AP", "USW00014607", 46.87, -68.02, 109, "1948-2013", 65],
	                       //["EASTPORT", "USC00172426", 44.91, -66.99, 26, "1948-2008", 42], ["FT KENT", "USC00172878", 47.24, -68.61, 186, "1953-2013", 41], 
	                      // ["GRAND LAKE STREAM", "USC00173261", 45.18, -67.77, 88, "1948-2013", 47], ["HOULTON", "USC00173897", 46.13, -67.83, 125, "1948-1985", 35], 
	                      // ["HOULTON 5 N", "USC00173944", 46.21, -67.84, 119, "1985-2013", 25], ["PRESQUE ISLE", "USC00176937", 46.65, -68.01, 183, "1978-2007", 14]]; 
  	
  	
  	var i; 
	var latlng;

    var infowindow = new google.maps.InfoWindow();

	var circle ={
   	 	path: google.maps.SymbolPath.CIRCLE,
   	 	fillColor: 'red',
   	 	fillOpacity: 1,
   	 	scale: 6,
  	    strokeColor: 'black',
  	    strokeWeight: 1
	};



	console.log('IN marked stn');

	console.log(gridCheck.checked);
	
	
	if (gridCheck.checked != true || ams_prod=='ams'){                                 /* atd 5/2 added ! */
                console.log('IN SHOW STN IF', ams_prod,gridCheck.checked);
		google.maps.event.removeListener(mapListener);
		mapListener = null; 
		deleteOverlays(); 
		map.setZoom(5);
		
		for (i = 0; i < xrain_stns.length; i++) { 
	  	   marker = new google.maps.Marker({
		        position:new google.maps.LatLng(xrain_stns[i][2], xrain_stns[i][3]),
		        icon: circle,
                map:map,
                 title:xrain_stns[i][0]
                    });

		/*   markers.push(marker);*/
           console.log('adding mouselistener');
	  	   google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
                       return function() {
                       infowindow.setContent(xrain_stns[i][0]);
                       infowindow.open(map, marker);
   					   $(".gm-style-iw").next("div").remove();
                       }
                    })(marker, i));

		  google.maps.event.addListener(marker, "click", (function (marker,i) {
                    return function(){
			stn_name = this.title;
			document.data.n.value = xrain_stns[i][2];
			document.data.w.value = xrain_stns[i][3];
			stn_id = xrain_stns[i][1];
			rec_leng = xrain_stns[i][6];
			rec_per= xrain_stns[i][5];
			stn_elev = xrain_stns[i][4];
			document.querySelector('#stn_content').innerHTML = stn_name;
			position = {lat:xrain_stns[i][2], lng:xrain_stns[i][3]};
			load('stn_point',position,6);
		    }
		  })(marker,i));    //
		}

        console.log(ams_prod,'location ounty spot',document.getElementById('location_county').style.display);
        document.getElementById('address').value = "";
	    document.getElementById('latitude').value = "";
        document.getElementById('longitude').value = "";
        document.getElementById('state_county').selectedIndex = 0;
	    document.getElementById('location_address').style.display = "none";	
	    document.getElementById('location_latlon').style.display = "none";
         document.getElementById('map_title_grid').style.display = "none";
         document.getElementById('map_title').style.display = "block";
        document.getElementById('location_county').style.display = "block";
	    document.getElementById('selected_stnname').style.display = "block";
//	    document.querySelector('#stn_content').innerHTML = stn_name;
	}
	else {
            stn_name = 'Click Marker to Select';
	        document.getElementById('selected_stnname').style.display = "none";
	        document.getElementById('location_address').style.display = "block";  
            document.getElementById('location_latlon').style.display = "block"; 
            document.getElementById('location_county').style.display = "block";
            document.getElementById('map_title_grid').style.display = "block";
            document.getElementById('map_title').style.display = "none";
	        document.querySelector('#stn_content').innerHTML = stn_name;
	        document.data.n.value = "";
	        document.data.w.value = "";
	        checkOptions();
	        load('reset','','');
	}		
}
