function gettingStarted() {
	window.open("docs/start.html","start","status=0, toolbar=0, location=0, menubar=1, directories=0, resizable=1, scrollbars=1, width=400, height=600");
}

function outreachReg() {
	window.open("outreach/index.php","outreach","status=0, toolbar=0, location=0, menubar=1, directories=0, resizable=1, scrollbars=1, width=850, height=775");
}
function listReg() {
	window.open("subscribe.php","subscribe","status=0, toolbar=0, location=0, menubar=1, directories=0, resizable=1, scrollbars=1, width=550, height=250");
}

$(document).ready(function() {

	$('#box_right_top').mouseenter(function() {
		document.getElementById('box_right_top').style.background = '#ffffaa';
		document.getElementById('help_title').style.color = '#990000';
		document.getElementById('help_image_img').src = 'img/faq_ffffaa.png';
	});

	$('#box_right_top').mouseleave(function() {
		document.getElementById('box_right_top').style.background = '#ffcc99';
		document.getElementById('help_title').style.color = '#000099';
		document.getElementById('help_image_img').src = 'img/faq_ffcc99.png';
	});

/*	$('#box_right_top').click(function() { gettingStarted(); });*/
	$('#box_right_top').click(function() { outreachReg(); });
/*	$('#box_right_top').click(function() { listReg(); });*/

});
