//Encipher/Decipher Functions
function keywordEncipher(input, keyword) {
    var output = "";
    var keyIndex = 0;
	var retainFormatting = document.getElementById('formatCheckbox').checked;
	//var splitIndex = 0;
    for (var x = 0; x < input.length; x++) {
        var ch = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(ch))) {
			if (retainFormatting) {
				output += shiftLetter(ch, getShiftAmount(keyword.charAt(keyIndex)));
			}
			else {
				output += shiftLetter(ch, getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
			}
            keyIndex++;
            if (keyIndex >= keyword.length) keyIndex = 0;
        } else {
			if (retainFormatting) {
				output += ch;
			}
			else {
				if ((/^\d+$/.test(ch))) {
					output += ch;
				}
			}
        }
    }
    return output;
}





function keywordDecipher(input, keyword) {
    var output = "";
    var keyIndex = 0;
	var retainFormatting = document.getElementById('formatCheckbox').checked;
	var splitIndex = 0;
    for (var x = 0; x < input.length; x++) {
        var ch = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(ch))) {
            if (retainFormatting) {
				output += shiftLetter(ch, -1 * getShiftAmount(keyword.charAt(keyIndex)));
			}
			else {
				output += shiftLetter(ch, -1 * getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
			}
			splitIndex++;
            keyIndex++;
            if (keyIndex >= keyword.length) keyIndex = 0;
        } else {
            if (retainFormatting) {
				output += ch;
				splitIndex++;
			}
			else {
				if ((/^\d+$/.test(ch))) {
					output += ch;
					splitIndex++;
				}
			}
        }
		if (!retainFormatting) {
			if (splitIndex == 5) {
				splitIndex = 0;
				output += " ";
			}
		}
    }
    return output;
}
