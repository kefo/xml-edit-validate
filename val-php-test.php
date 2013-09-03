<?php

ini_set("display_errors", true);
error_reporting(E_ALL);

$xml = '<mods:mods version="3.3" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-3.xsd" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><mods:titleInfo><mods:title>Health promotion strategies through the life span</mods:title></mods:titleInfo></mods:mods>';
$xml = '<mods version="3.3" xmlns="http://www.loc.gov/mods/v3"><titleInfo><title>Health promotion strategies through the life span</title></titleInfo></mods>';
$xsd = file_get_contents("http://www.loc.gov/standards/mods/mods.xsd");

$doc = new DOMDocument();
$doc->loadXML($xml);

$tempFile = time() . '-' . rand() . '-document.tmp';
$doc->save($tempFile);
 
// Create temporary DOMDocument and re-load content from file.
$doc2 = new DOMDocument();
$doc2->load($tempFile);
 
// Delete temporary file.
if (is_file($tempFile)) {
    unlink($tempFile);
}

echo $xsd;
echo "<br /><br /><br />";
echo $doc2->schemaValidateSource($xsd);
//echo $doc2->schemaValidate("http://www.loc.gov/standards/mods/mods.xsd");


?>