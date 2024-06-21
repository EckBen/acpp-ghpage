function helpMe(e) {
  if (e.target) myTarget = e.target;
  else if (e.srcElement) myTarget = e.target;
  if (myTarget.nodeType == 3) myTarget = myTarget.parentNode;
  myTarget = myTarget.id;
  if (myTarget != "") {
    window.open(
      "help.php?page=" + myTarget,
      "help",
      "status=0, toolbar=0, location=0, menubar=0, directories=0, resizable=1, scrollbars=1, height=400, width=440, top=100, left=100",
    );
  }
}

function productOn(id) {
  document.getElementById("product_" + id).style.background = "#ffffdd";
  document.getElementById("product_" + id).getElementsByTagName("img")[0].src =
    "img/question_ffffdd.png";
}
function productOff(id) {
  document.getElementById("product_" + id).style.background = "#aaccff";
  document.getElementById("product_" + id).getElementsByTagName("img")[0].src =
    "img/question_aaccff.png";
}

function dataSubmit_original() {
  checkOptions();
  var product = document.data.p.value;
  var lat = document.data.n.value;
  var lon = document.data.w.value;
  if (product == "maps" || product == "gis") {
    lat = "X";
    lon = "X";
  }
  var option1 = document.data.o1.value;
  var option2 = document.data.o2.value;
  var option3 = document.data.o3.value;
  //var option4 = document.data.o4.value;
  //var delivery = document.data.d.value;

  console.log(option1);
  console.log(option2);
  console.log(option3);
  //console.log(option4);
  //console.log(delivery);

  console.log("BEFORE POST");
  //	document.data.method = 'POST';
  //	var timestamp = new Date().getTime();
  console.log(timestamp);
  console.log("AFTER POST");
  //	document.data.action = 'data.php?' + timestamp;
  //	if (delivery=="download") {
  //		document.data.target = 'download';
  //	} else {
  //		document.data.target = '_blank';
  //	}
  //	document.data.submit();
}

function dataSubmit() {
  checkOptions();
  var product = document.data.p.value;
  var lat = document.data.n.value;
  var lon = document.data.w.value;
  if (product == "maps" || product == "gis") {
    lat = "X";
    lon = "X";
  }
  var option1 = document.data.o1.value;
  var option2 = document.data.o2.value;
  var option3 = document.data.o3.value;
  var option4 = "not needed";
  var delivery = "pop up" / document.data.d.value;

  console.log(option1);
  console.log(option2);
  console.log(option3);
  console.log(option4);
  console.log(delivery);
  console.log(document.data.p.value);
  console.log(document.data.n.value);
  console.log(document.data.w.value);
  console.log(stn_name);
  console.log(product);

  if (product == "html") {
    var new_page = "../page_xprecip_table.html";
  } else if (product == "ifd") {
    var new_page = "../page_ifd_graph.html";
  } else if (product == "text") {
    var new_page = "../page_xprecip_csv.html";
  } else if (product == "pfd") {
    var new_page = "../page_precipFreq_graph.html";
  } else if (product == "amsstn") {
    var new_page = "../page_amsstn_table.html";
  } else if (product == "maps") {
    var new_page = "../page_maps.html";
  } else if (product == "gis") {
    var new_page = "../page_gis.html";
  }

  console.log(new_page);
  OpenProdWin(new_page, option1, option2, option3);

  // console.log('BEFORE POST')
  // document.data.method = 'POST';
  // var timestamp = new Date().getTime();
  // console.log(timestamp)
  // console.log('AFTER POST')
  // document.data.action = 'data.php?' + timestamp;
  // if (delivery=="download") {
  //         document.data.target = 'download';
  // } else {
  //         document.data.target = '_blank';
  // }
  // document.data.submit();
}

function OpenProdWin(new_page, option1, option2, option3) {
  // var output_div = '<div id="output_div"><p>'+option1+' </p></div>';
  console.log("before open");

  localStorage.setItem("passed_lat_val", document.data.n.value);
  localStorage.setItem("passed_lon_val", document.data.w.value);
  localStorage.setItem("passed_stn", stn_name);
  localStorage.setItem("passed_option1", option1);
  localStorage.setItem("passed_option2", option2);
  localStorage.setItem("passed_option3", option3);
  localStorage.setItem("passed_option4", "not needed");
  localStorage.setItem("passed_stn_id", stn_id);
  localStorage.setItem("passed_rec_leng", rec_leng);
  localStorage.setItem("passed_rec_per", rec_per);
  localStorage.setItem("passed_elev", stn_elev);

  console.log(option1);
  console.log(option2);

  console.log("after GET");
  console.log(new_page);
  window.open(new_page).document.body.innerHTML;
  console.log("after open");
  //+=output_div;
}

function updateIntensity() {
  var duration = document.getElementById("option1").value;
  if (duration == "nminute") {
    document.getElementById("option2").selectedIndex = 0;
  } else if (duration == "hourly") {
    document.getElementById("option2").selectedIndex = 1;
  } else if (duration == "daily") {
    document.getElementById("option2").selectedIndex = 2;
  }
}

function concatOption1() {
  var option1a = document.getElementById("option1a").value;
  var option1b = document.getElementById("option1b").value;
  var option1c = document.getElementById("option1c").value;
  var concat = option1a + "|" + option1b + "|" + option1c;
  alert(concat);
}

$(document).ready(function () {
  product = "html";
  var locale = location.href;
  var first_hash = locale.indexOf("#");
  var second_hash = locale.indexOf("#", first_hash + 1);
  if (second_hash < 0) {
    second_hash = locale.length;
  }
  if (first_hash >= 0) {
    product = locale.substring(first_hash + 1, second_hash);
  }
  if (product == "") {
    product = "html";
  }
  changeProduct(product);
});
