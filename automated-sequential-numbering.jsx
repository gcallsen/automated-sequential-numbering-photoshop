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


if ( documents.length > 0 ) {
	var originalDialogMode = app.displayDialogs;
	app.displayDialogs = DialogModes.ERROR;
	var originalRulerUnits = preferences.rulerUnits;
	preferences.rulerUnits = Units.PIXELS;

	try {
		var docRef = activeDocument;

		//Prompt User to tell us how many numbers to make & make sure is a num
		var num_layers = prompt("How many numbers should I make?",
							"(i.e. 100)",
							"Input Num Layers");
		isNumber(num_layers);

		//Prompt User to tell us at which number to start & make sure is a num
		var num_start = prompt("Where should numbering start?",
							"(i.e. 1)",
							"Input Start Number");
		isNumber(num_start);

		//Prompt User to tell us level of padding on number
		var num_padding = prompt("What level of padding? Enter 1 for 1, 2, 3...or Enter 3 for 001, 002, 003...",
							"(i.e. 1)",
							"Input Start Number");
		isNumber(num_padding);

		//Prompt User to tell us if there should be a string appended to number.
		var append_string =
			prompt("Want a string appended to number? Leave blank if not.",
							"(i.e. ##-string)",
							"Input Append String");

		// Start our Loop based on user's num_layers input
		for (var i = 0; i < num_layers; i++) {

			// Pad our number first. Num based on num_start and num_layers
			// (i.e. number within this loop, i)
			var padded_num = String(i + parseInt(num_start));
			while ( padded_num.length < num_padding ) {
				padded_num = '0' + padded_num;
			}

			// Select our number_layer by name
			var num_layer_ref = docRef.artLayers.getByName("number_layer");
			var num_layer_text = num_layer_ref.textItem;

			// Select our bg_layer by name
			var bg_layer_ref = docRef.artLayers.getByName("bg_layer");

			// Duplicate our layers
			var new_bg_layer = bg_layer_ref.duplicate(docRef, ElementPlacement.INSIDE);
			var new_num_layer = num_layer_ref.duplicate(docRef, ElementPlacement.INSIDE);

			// Replace contents of new number layer
			new_num_layer.textItem.contents = padded_num + append_string;

			// Merge new num layer down onto duplicated bg layer
			var merged_layer = new_num_layer.merge();

			// Rename newly merged layer
			merged_layer.name = padded_num + append_string;
		}

	}
	catch( e ) {
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
else {
	alert( "You must have a document open to add the filename!" );
}

// Helper function to ensure user input is a number, otherwise throw exception.
function isNumber(n) {
	var num = parseInt(n);
	if (isNaN(parseFloat(num)) && !isFinite(num)) {
		throw "That's not a number! Sorry...";
	}
	return;
}