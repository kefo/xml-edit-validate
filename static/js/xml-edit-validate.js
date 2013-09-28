$(document).ready(init);


function init() {
    
    $('.dropdown-toggle').dropdown();

	mods35 = '<?xml version="1.0"?><mods:mods version="3.5" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-5.xsd" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><mods:titleInfo><mods:title>Title</mods:title></mods:titleInfo></mods:mods>';
	oaidc = '<?xml version="1.0"?><oai_dc:dc xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd" xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>this is a title</dc:title></oai_dc:dc>';
	vra4 = '<?xml version="1.0"?><vra:vra xsi:schemaLocation="http://www.vraweb.org/vracore4.htm http://www.loc.gov/standards/vracore/vra.xsd" xmlns:vra="http://www.vraweb.org/vracore4.htm" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><vra:work /><vra:image /></vra:vra>';
	cdwalite = '<?xml version="1.0"?><cdwalite:cdwalite xmlns:cdwalite="http://www.getty.edu/CDWA/CDWALite" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.getty.edu/CDWA/CDWALite http://www.getty.edu/CDWA/CDWALite/CDWALite-xsd-public-v1-1.xsd"><cdwalite:descriptiveMetadata /><cdwalite:administrativeMetadata><cdwalite:recordWrap /><cdwalite:resourceWrap /></cdwalite:administrativeMetadata></cdwalite:cdwalite>';
    audiomd = '<?xml version="1.0"?><audiomd:AUDIOMD xmlns:audiomd="http://www.loc.gov/audioMD/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.loc.gov/audioMD/ http://www.loc.gov/standards/amdvmd/audioMD.xsd" ANALOGDIGITALFLAG="FileDigital"></audiomd:AUDIOMD>';
    mix = '<?xml version="1.0"?><mix:mix xmlns:mix="http://www.loc.gov/mix/v20" xsi:schemaLocation="http://www.loc.gov/mix/v20 http://www.loc.gov/standards/mix/mix20/mix20.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><mix:BasicDigitalObjectInformation /><mix:BasicImageInformation /></mix:mix>';

    xml = vra4;

	// Set up the editor
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode("ace/mode/xml");
    editor.getSession().setValue(xml);
    editor.resize();
          
    $( "#base-records > li > a").click(function() {
        var xml = editor.getSession().getValue();
        t = $(this).text();
        if (t == "OAI Dublin Core") { 
            xml = oaidc; 
        } else if (t == "MODS 3.5") { 
            xml = mods35;
        } else if (t == "VRA Core 4.0") { 
            xml = vra4;
        } else if (t == "CDWA Lite") { 
            xml = cdwalite;
        } else if (t == "Audio MD") { 
            xml = audiomd;
        } else if (t == "MIX") { 
            xml = mix;
        }
        editor.getSession().setValue(xml);
    });
    
	$( "#prettify" ).click(function() {
		var xml = editor.getSession().getValue();
		xml = vkbeautify.xml(xml)
		editor.getSession().setValue(xml);
	});
	
	$( "#validate" ).click(function() {
		var xml = editor.getSession().getValue();
		//alert(xml);
		idiv = $("#info");
		idiv.empty();
		try {
            var xmlDoc = $.parseXML( xml );
            var $xml = $( xmlDoc );
            root = ($xml.find("*").eq(0)[0]);
            doValidation(xml, root);
        } catch(e) {
            //alert(e);
            var messagediv = $('<div id="responsemessage" class="alert alert-danger">XML likely NOT well-formed (' + e.toString() + ').');
			idiv.append(messagediv);
			messagediv.fadeOut(30000, function() {
				idiv.empty();
			});
			return;
        }


	});
	
function doValidation(xml, root) {
		// Let's get the schemas
		schemastr = $( root ).attr("xsi:schemaLocation");
		if (typeof schemastr == 'undefined' ) {
		    var messagediv = $('<div id="responsemessage" class="alert alert-warning">Well-formed XML, but no schemaLocation declared.</div>');
			    idiv.append(messagediv);
				messagediv.fadeOut(30000, function() {
				idiv.empty();
			});
			return;
		}
		schemaParts = schemastr.split(" ");
		schemas = {};
		for (var i=0; i < schemaParts.length; i++) {
            if ( i === 0 || (i % 2) === 0 ) {
                schemas[schemaParts[i]] = "";
            } else {
                schemas[schemaParts[i-1]] = schemaParts[i];
            }
		}
		//alert(schemaParts);
		//alert(schemas.toSource());
		
		// Let's get the root namespace
        rootName = root.nodeName;
        var xmlns;
		if ( rootName.indexOf(":") != -1 ) {
            prefix = rootName.substring( 0, rootName.indexOf(":") );
            //alert(prefix);
            xmlns = $( root ).attr("xmlns:" + prefix);
        } else {
            xmlns = $( root ).attr("xmlns");
        }
        //alert("got here " + xmlns);
		
		idiv = $("#info");
		if ( typeof xmlns !== 'undefined' ) { 
		    schema = schemas[xmlns];
		    //alert(schema);
		    //alert(xml);
		    $.post("validate.php", { xmlData: xml, xsdLoc: schema })
                .done(function(d) {
                    //alert(d);
                    response = $.parseJSON(d);
				    if (response.error) {
					    var messagediv = $('<div id="responsemessage" class="alert alert-danger">' + response.msg + '</div>');
					    idiv.append(messagediv);
					    messagediv.fadeOut(30000, function() {
						    idiv.empty();
					    });
				    } else {
					    var messagediv = $('<div id="responsemessage" class="alert alert-success">' + response.msg + '</div>');
					    idiv.append(messagediv);
					    messagediv.fadeOut(4000, function() {
					    	idiv.empty();
					    });
				    }
                });
        } else {
		    var messagediv = $('<div id="responsemessage" class="alert alert-danger">Unable to determine Scheme (XSD) file</div>');
			idiv.append(messagediv);
			messagediv.fadeOut(30000, function() {
			    idiv.empty();
			});
			return true;
        }
    }
}
