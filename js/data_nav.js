String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

function checkOptions() {
  var product = document.data.p.value;
  var lat = document.data.n.value;
  var lon = document.data.w.value;
  if (
    product == "pdsstn" ||
    product == "maps" ||
    product == "gis" ||
    product == "static"
  ) {
    lat = "X";
    lon = "X";
  }
  var option1_verify = "YES";
  if (product == "pdsstn") {
    try {
      var option1 =
        document.getElementById("option1a").value +
        "__________" +
        document.getElementById("option1b").value +
        "__________" +
        document.getElementById("option1c").value;
      if (option1.replace(" ", "").length < 22) {
        option1_verify = "";
      }
    } catch (err) {}
  } else {
    var option1 = document.getElementById("option1").value;
    if (option1.replace(" ", "") == "") {
      option1_verify = "";
    }
  }
  var option2 = document.getElementById("option2").value;
  var option3 = document.getElementById("option3").value;
  var option4 = "not needed"; //document.getElementById('option4').value;
  var delivery = "popup"; // document.getElementById('delivery').value;
  document.data.o1.value = option1;
  document.data.o2.value = option2;
  document.data.o3.value = option3;
  document.data.o4.value = option4;
  document.data.d.value = delivery;

  console.log(product);
  console.log(lat);
  console.log(lon);
  console.log(option1_verify);
  console.log(option2);
  console.log(option3);
  console.log(option4);
  console.log(delivery);

  if (
    product != "" &&
    lat != "" &&
    lon != "" &&
    option1_verify != "" &&
    option2 != "" &&
    option3 != "" &&
    option4 != "" &&
    delivery != ""
  ) {
    document.getElementById("submit_button").style.background = "#aaffaa";
    document.getElementById("submit_button").disabled = "";
  } else {
    document.getElementById("submit_button").style.background = "#ffaaaa";
    document.getElementById("submit_button").disabled = "disabled";
  }
}

function changeProduct(id) {
  $.get("products/" + id + ".html", function (thePage) {
    document.getElementById("product").innerHTML = thePage;
    selectStatesCounties();
    try {
      load("default", "", "");
      console.log("loading load");
    } catch (err) {}
    $(document).ready(function () {
      $("img.help").click(function (e) {
        handOn();
      });
      $("img.help").mouseleave(function () {
        handOff();
      });
      $("img.help").click(function (e) {
        helpMe(e);
      });

      $("#product_html").mouseenter(function () {
        productOn("html");
      });
      $("#product_html").mouseleave(function () {
        productOff("html");
      });
      $("#product_text").mouseenter(function () {
        productOn("text");
      });
      $("#product_text").mouseleave(function () {
        productOff("text");
      });
      //$('#product_pds').mouseenter(function() { productOn('pds'); });
      //$('#product_pds').mouseleave(function() { productOff('pds'); });
      $("#product_amsstn").mouseenter(function () {
        productOn("amsstn");
      });
      $("#product_amsstn").mouseleave(function () {
        productOff("amsstn");
      });
      //$('#product_dist').mouseenter(function() { productOn('dist'); });
      //$('#product_dist').mouseleave(function() { productOff('dist'); });
      //$('#product_disttext').mouseenter(function() { productOn('disttext'); });
      //$('#product_disttext').mouseleave(function() { productOff('disttext'); });
      $("#product_ifd").mouseenter(function () {
        productOn("ifd");
      });
      $("#product_ifd").mouseleave(function () {
        productOff("ifd");
      });
      $("#product_pfd").mouseenter(function () {
        productOn("pfd");
      });
      $("#product_pfd").mouseleave(function () {
        productOff("pfd");
      });
      $("#product_maps").mouseenter(function () {
        productOn("maps");
      });
      $("#product_maps").mouseleave(function () {
        productOff("maps");
      });
      $("#product_gis").mouseenter(function () {
        productOn("gis");
      });
      $("#product_gis").mouseleave(function () {
        productOff("gis");
      });
      //        		$('#product_web').mouseenter(function() { productOn('web'); });
      //			$('#product_web').mouseleave(function() { productOff('web'); });

      productOff("html");
      productOff("text");
      //productOff('pds');
      productOff("amsstn");
      //productOff('dist');
      //productOff('disttext');
      productOff("ifd");
      productOff("pfd");
      productOff("maps");
      productOff("gis");
      //			productOff('web');

      $("#product_" + id).unbind();
      document.getElementById("product_" + id).style.background = "#ddffff";
      document
        .getElementById("product_" + id)
        .getElementsByTagName("img")[0].src = "img/question_ddffff.png";
      document.data.p.value = id;

      $(document).ready(function () {
        console.log("triggered function");
        var help_file_name;

        $(".help_master").click(function () {
          console.log("triggered function2");
          help_file_name = "help/" + this.id + ".html";

          $("#info_blurb").show().load(help_file_name);
          console.log(help_file_name);
        });
      });

      checkOptions();
      $("#option1").change(function () {
        checkOptions();
      });
      try {
        $("#option1a").change(function () {
          checkOptions();
        });
        $("#option1b").change(function () {
          checkOptions();
        });
        $("#option1c").change(function () {
          checkOptions();
        });
      } catch (err) {}
      $("#option2").change(function () {
        checkOptions();
      });
      $("#option3").change(function () {
        checkOptions();
      });
      $("#option4").change(function () {
        checkOptions();
      });
      $("#delivery").change(function () {
        checkOptions();
      });
    });
  });
}
