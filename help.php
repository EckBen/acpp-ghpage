<?
$get_page = str_replace("help_","",$_GET[page]);
$get_file = 'help/' . strtolower($get_page) . '.html';
//$get_title = str_replace("_"," ",$get_page);
$get_text = "";
if(file_exists($get_file)) {
  $get_text = file_get_contents($get_file);
}
$title_start = strpos(strtolower($get_text),"<h1>") + 4;
$title_end = strpos(strtolower($get_text),"</h1>");
$title_len = $title_end - $title_start;
$get_title = trim(substr($get_text,$title_start,$title_len));
if ($get_title=="") {
  $get_title = str_replace("_"," ",$get_page);
}
$get_text = trim(substr($get_text,$title_end + 5));
$get_text = str_replace('img/','help/img/',$get_text);
if ($get_text=="") {
  $get_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis pellentesque leo, eget facilisis nulla mattis non. Pellentesque neque libero, ullamcorper at tristique a, feugiat a enim. Aliquam malesuada feugiat sapien sit amet sodales. Fusce id ante eget justo lacinia varius. In placerat dignissim elit, quis consequat dui vulputate eget. Integer feugiat lobortis dui, at pulvinar nulla vulputate sed. Ut vel sagittis nibh. Morbi accumsan, felis a convallis vulputate, quam eros fermentum dolor, non tristique ipsum urna in ipsum. Vestibulum auctor sem sit amet eros egestas vel laoreet dolor mollis. Ut nunc tellus, ultrices eget dignissim id, vulputate sit amet enim. Quisque aliquam justo sed enim malesuada pellentesque. Ut varius orci sed nulla egestas eu dapibus purus pharetra. Vivamus euismod, augue vestibulum aliquet mollis, mauris odio eleifend nisl, nec faucibus dolor leo vitae diam. Ut iaculis nisl ac felis pellentesque in tristique sapien consectetur. Aliquam erat volutpat.";
}
?>

<html>
<head>
<title>Help!  <? echo($get_title) ?></title>
<link rel="stylesheet" href="css/help.css" media="all"/>
</head>
<body>

<div id="help_titlebar">
<div id="help_title"><? echo($get_title) ?></div>
</div>
<div id="help_text">

<? echo($get_text) ?>

<div id="help_footer">
<a target="_blank" href="help/index.html"><img src="help/img/icon_book.gif"/><br/><p>Complete Users Manual</p></a>

</div>

</div>

</body>
</html>

<?php
define("_BBC_PAGE_NAME", "Help");
define("_BBCLONE_DIR", "bbclone/");
define("COUNTER", _BBCLONE_DIR."mark_page.php");
if (is_readable(COUNTER)) include_once(COUNTER);
?>