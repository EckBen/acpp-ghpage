<?
$get_page = trim($_GET[page]);
$get_file = strtolower($get_page) . '.html';
if ($get_page=="" or !file_exists($get_file)) {
  $get_page = "manual";
  $get_file = "manual.html";
}
  $get_text = file_get_contents($get_file);
  $title_start = strpos(strtolower($get_text),"<h1>") + 4;
  $title_end = strpos(strtolower($get_text),"</h1>");
  $title_len = $title_end - $title_start;
  $get_title = trim(substr($get_text,$title_start,$title_len));
  if ($get_title=="") {
    $get_title = str_replace("_"," ",$get_page);
  }
  $get_text = trim(substr($get_text,$title_end + 5));
  if ($get_text=="") {
    $get_text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  }
?>
 
<html>
<head>
<link rel="stylesheet" href="../css/help.css" media="all"/>
</head>
<body>

<div id="help_titlebar">
   <div id="help_title"><? echo($get_title) ?></div>
</div>
<div id="help_text">

<?
   echo($get_text);
?>

</div>
</body>
</html>