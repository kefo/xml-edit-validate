$(document).ready(init);


function init() {

	xml = '<?xml version="1.0" encoding="UTF-8"?><mods xmlns="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-4.xsd" version="3.4"><titleInfo><title>Gacha Gacha</title></titleInfo><titleInfo type="uniform" nameTitleGroup="1"><title>Gachagacha. English</title></titleInfo><name type="personal" usage="primary" nameTitleGroup="1"><namePart>Tamakoshi, Hiroyuki.</namePart></name><name type="personal"><namePart>Ury, David.</namePart></name><typeOfResource>text</typeOfResource><genre authority="marcgt">comic strip</genre><genre authority="">Graphic novels.</genre><originInfo><place><placeTerm type="code" authority="marccountry">nyu</placeTerm></place><place><placeTerm type="text">New York, N.Y</placeTerm></place><publisher>Ballantine Books</publisher><dateIssued>&lt;c2005-c2008&gt;</dateIssued><dateIssued point="start" encoding="marc">2006</dateIssued><dateIssued point="end" encoding="marc">9999</dateIssued><issuance>monographic</issuance></originInfo><language><languageTerm type="code" authority="iso639-2b">eng</languageTerm></language><language objectPart="translation"><languageTerm type="code" authority="iso639-2b">jpn</languageTerm></language><physicalDescription><form authority="marcform">print</form><extent>v. &lt;1-6, 8,9,11&gt; : chiefly ill. ; 21 cm.</extent></physicalDescription><abstract>Lately, Kouhei can\'t get his friend Kurara out of his mind. Even though he has known her since elementary school, all of a sudden, ever since she came back from summer vacation, he has been crushing on her hard. But something is different about Kurara-she is acting very oddly. Sometimes she seems wholesome, pure, and innocent, and at other times she is extremely forward and unabashed. Kouhei soon learns that Kurara has multiple personalities-and decides to help her keep her secret from their classmates. But Kouhei finds himself struggling between helping Kurara as a friend and trying to win her heart ... which is a challenge, since she has many!</abstract><tableOfContents>v. 6,9. The next revolution</tableOfContents><targetAudience>Rating: OT ages 16+</targetAudience><note type="statement of responsibility" altRepGroup="00">Hiroyuki Tamakoshi ; translated and adapted by David Ury ; lettered by North Market Street Graphics.</note><note>"DEL REY."</note><note>Vol. 2-3 lettered by Wilson Ramos, Jr. ; v. &lt;4-5&gt;- lettered by Patrice Sheridan ; v. 9 lettered by North Market Street Graphics ; v. 11 lettered by North Market Street Graphics.</note><note>Vol. 1 published in 2006.</note><note>"Mature content"---Vol. 5, cover p. 1.</note><classification authority="lcc">PN6790.J33 T37 2005</classification><classification authority="ddc" edition="22">741.5/952</classification><identifier type="isbn">9780345492333 (v. 1 : pbk.)</identifier><identifier type="isbn">9780345486226 (v. 2 : pbk.)</identifier><identifier type="isbn">0345486226 (v. 2 : pbk.)</identifier><identifier type="isbn">9780345486233 (v. 3 : pbk.)</identifier><identifier type="isbn">0345486234 (v. 3 : pbk.)</identifier><identifier type="isbn">9780345493224 (v. 4 : pbk.)</identifier><identifier type="isbn">034548679X (v. 4 : pbk.)</identifier><identifier type="isbn">9780345493231 (v. 5 :pbk)</identifier><identifier type="isbn">0345492323 (v. 5 : pbk.)</identifier><identifier type="isbn">9780345501707 (v. 8 : pbk.)</identifier><identifier type="isbn">9780345506719 (v. 9 : pbk.)</identifier><identifier type="isbn">9780345515858 (v. 11 : pbk.)</identifier><identifier type="lccn">2005904335</identifier><identifier type="oclc">ocm63257616</identifier><identifier type="oclc">63257616</identifier><relatedItem><location><url displayLabel="Publisher description">http://www.loc.gov/catdir/enhancements/fy0710/2005904335-d.html</url></location></relatedItem><recordInfo><descriptionStandard>aacr</descriptionStandard><recordContentSource authority="marcorg">IOS</recordContentSource><recordCreationDate encoding="marc">070116</recordCreationDate><recordChangeDate encoding="iso8601">20110120111835.0</recordChangeDate><recordIdentifier>14699176</recordIdentifier><recordOrigin>Converted from MARCXML to MODS version 3.4 using MARC21slim2MODS3-4.xsl (Revision 1.85 2013/03/07)</recordOrigin></recordInfo></mods>';
	xml = '<?xml version="1.0"?><mods:mods version="3.5" xsi:schemaLocation="http://www.loc.gov/mods/v3 http://www.loc.gov/standards/mods/v3/mods-3-5.xsd" xmlns:mods="http://www.loc.gov/mods/v3" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><mods:titleInfo><mods:title>Title</mods:title></mods:titleInfo></mods:mods>';
	//xml = '<?xml version="1.0"?><oai_dc:dc xsi:schemaLocation="http://www.openarchives.org/OAI/2.0/oai_dc/ http://www.openarchives.org/OAI/2.0/oai_dc.xsd" xmlns:oai_dc="http://www.openarchives.org/OAI/2.0/oai_dc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>this is a title</dc:title></oai_dc:dc>';
	xml = '<?xml version="1.0"?><vra:vra xsi:schemaLocation="http://www.vraweb.org/vracore4.htm http://www.loc.gov/standards/vracore/vra.xsd" xmlns:vra="http://www.vraweb.org/vracore4.htm" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><vra:work /></vra:vra>';

	// Set up the editor
	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/eclipse");
    editor.getSession().setMode("ace/mode/xml");
    editor.getSession().setValue(xml);
    editor.resize()
          
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
