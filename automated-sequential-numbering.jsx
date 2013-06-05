// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
// Name: Automated Sequential Numbering
//
// Use case: You want customer referral cards with unique numbers, i.e. 001-100.
// 			Each card output as an individual file (jpg/png/etc) for upload to a
// 			service such as Moo.com.
//
// Instructions:
//		1) Ensure this script is in your Photoshop/presets/scripts/ folder
//		2) In Photoshop, create two layers:
//			2a) bg_layer --> This is a single merged layer of your design
//			2b) number_layer --> Pre-formatted layer for numbers (empty)
//		3) Run script by File --> Scripts --> automated-sequential-numbering
//		4) Follow prompts
//		5) Create individual files by using built in "Export Layers to Files..."
//
// Author: Gilman Callsen
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *


if ( documents.length > 0 )
{
	var originalDialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.ERROR;
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try
	{
		var docRef = activeDocument;

		//Prompt User to tell us how many numbers to make
		var num_layers = prompt("How many numbers should I make?","","Input Num Layers");
		//Check that it's a number
		isNumber(num_layers);
		//Prompt User to tell us at which number to start
		var num_start = prompt("Where should numbering start? (i.e. 1)","","Input Start Number");
		//Check that it's a number
		isNumber(num_start);
		//Prompt User to tell us if there should be a string appended to number.
		var append_string = prompt("Want a string appended to number? (i.e. 050-str","","Input Append String");



		// Now create a text layer at the front
		var myLayerRef = docRef.artLayers.add();
		myLayerRef.kind = LayerKind.TEXT;
		myLayerRef.name = num_layers;

		var myTextRef = myLayerRef.textItem;

		// strip the extension off
		var fileNameNoExtension = docRef.name;
		fileNameNoExtension = fileNameNoExtension.split( "." );
		if ( fileNameNoExtension.length > 1 ) {
			fileNameNoExtension.length--;
		}
		fileNameNoExtension = fileNameNoExtension.join(".");

		myTextRef.contents = num_layers + "-" + num_start;

		// off set the text to be in the middle
		myTextRef.position = new Array( docRef.width / 2, docRef.height / 2 );
		myTextRef.size = 20;
	}
	catch( e )
	{
		// An error occurred. Restore ruler units, then propagate the error back
		// to the user
		preferences.rulerUnits = originalRulerUnits;
        app.displayDialogs = originalDialogMode;
		throw e;
	}

	// Everything went Ok. Restore ruler units
	preferences.rulerUnits = originalRulerUnits;
	app.displayDialogs = originalDialogMode;
}
else
{
	alert( "You must have a document open to add the filename!" );
}

function isNumber(n) {
	var num = parseInt(n);
	if (isNaN(parseFloat(num)) && !isFinite(num)) {
		throw "That's not a number! Sorry...";
	}
	return;
}