<?php

ini_set("display_errors", true);
ini_set("track_errors", 1);
ini_set("html_errors", 1);
error_reporting(E_ALL);

include("classes/Validate.php");

$xmldata = ( isset($_POST["xmlData"]) ? $_POST["xmlData"] : '');
$xsddata = ( isset($_POST["xsdData"]) ? $_POST["xsdData"] : '');

$xmlloc = ( isset($_POST["xmlLoc"]) ? $_POST["xmlLoc"] : '');
$xsdloc = ( isset($_POST["xsdLoc"]) ? $_POST["xsdLoc"] : '');

$validate = new Validate("hack");

if ($xmlloc != "") { $validate->getXML($xmlloc); }
if ($xsdloc != "") { $validate->getXSD($xsdloc); }
if ($xmldata != "") { $validate->setXMLdata($xmldata); }
if ($xsddata != "") { $validate->setXSDdata($xsddata); }

$valid = $validate->isValid();
echo json_encode($valid);

?>