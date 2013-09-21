<?php

/*
* Validate Class

 My hosting company has created a mess - for me - when
 it comes to Validating XML.  In short, the logical method
 is not possible because PHP uses a libxml2 package with a
 bug in it and they do not upgrade, I guess.  Asses.
 
 Hence the "hack" method.
 
 
*/

class Validate
{
    
    public $method;
    
    public $xmlloc;
    public $xsdloc;
    
    public $xmldata;
    public $xsddata;
    
    public $xmldoc;
    
    public $error;
    
    function Validate($method = "dom") { 
        $this->method = $method;
        //set_error_handler("handleValidationError");
        set_error_handler(array($this, 'handleValidationError'));
    }
    
    function getXML($xmlloc) {
        $this->xmlloc = $xmlloc;
        $data = file_get_contents($xmlloc);
        $this->setXMLdata($data);
    }
    
    function setXMLdata($data) {
        $this->xmldata = stripslashes($data);

        $this->xmldoc = new DOMDocument();
        $this->xmldoc->loadXML($data);
        
        if ($this->method == "hack") {
            $tempFile = "tmp/" . time() . '-' . rand() . '-document.tmp';
            //$this->xmldoc->save($tempFile);
            //$xmlout = $this->xmldoc->saveXML();
            file_put_contents($tempFile, $this->xmldata);
            $this->xmlloc = $tempFile;
        }
    }
    
    function getXSD($xsdloc) {
        $this->xsdloc = $xsdloc;
        $this->xsddata = file_get_contents($xsdloc);
    }
    
    function setXSDdata($data) {
        $this->xsddata = $data;
    }
    
    function isValid() {
        
        $result = array();
        $result["valid"] = true;
        $result["error"] = false;
        $result["msg"] = "Valid XML";
        if ($this->method == "dom") {
            if ($this->xsdloc != "") {
                $valid = $this->xmldoc->schemaValidate($this->xsdloc);
                if (!$valid) { 
                    $result["valid"] = false;
                    $result["error"] = true;
                    $result["msg"] = $this->error["message"];
                }
            } else {
                $valid = $this->xmldoc->schemaValidateSource($this->xsddata);
                if (!$valid) { 
                    $result["valid"] = false;
                    $result["error"] = true;
                    $result["msg"] = $this->error["message"];
                }
            }
            return $result;
        } elseif ($this->method == "hack") {
            if ($this->xsdloc != "") {
                //$cmd = 'xmlstarlet val -e -s "http://www.loc.gov/standards/mods/mods.xsd" ' . $tempFile;
                $cmd = '/usr/bin/xmllint --noout --schema "' . $this->xsdloc . '" ' . $this->xmlloc;
                //$result["msg"] = $cmd;
                $handle = popen($cmd . ' 2>&1', 'r');
                //echo "'$handle'; " . gettype($handle) . "\n";
                //$read = fread($handle, 20480);
                $read = array();
                while ($s = fgets($handle,2048)) {
                    array_push($read, $s);
                } 
                //echo $read;
                pclose($handle);
                
                //$result["xmldata"] = $this->xmldata;
                //$result["msg"] = $read[0];
                if (strpos($read[ count($read)-1 ], "fails to") !== false) {
                    $pos = strpos($read[0], '.tmp:');
                    $msg = substr($read[0], $pos + 8);
                    $result["valid"] = false;
                    $result["error"] = true;
                    $result["msg"] = "Total no. of errors: " . (count($read)-1) . "; Error 1: " . trim($msg);

                } else {
                    $result["output"] = $read[5];
                }
                
                // Delete temporary file.
                if (is_file($this->xmlloc)) {
                    unlink($this->xmlloc);
                }

            }
            return $result;
        }
    }
    
    function handleValidationError($errno, $errstr, $errfile, $errline) {
        if (!(error_reporting() & $errno)) {
            // This error code is not included in error_reporting
            return;
        }

        $err = array();
        
        $str = "";
        $pos = strpos($errstr, ']:');
        $str = substr($errstr, $pos + 2);
        $err["message"] = trim($str);

        $this->error = $err;
        /* Don't execute PHP internal error handler */
        return true;
    }
}

?>