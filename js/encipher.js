//Encipher/Decipher Functions
function keywordEncipher(input, keyword) {
    var output = "";
    var keyIndex = 0;
	var retainFormatting = document.getElementById('formatCheckbox').checked;
	var splitIndex = 0;
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
			if (retainFormatting) {
				output += shiftLetter(c, getShiftAmount(keyword.charAt(keyIndex)));
			}
			else {
				output += shiftLetter(c, getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
			}
			splitIndex++;
            keyIndex++;
            if (keyIndex >= keyword.length) keyIndex = 0;
        } else {
			if (retainFormatting) {
				output += c;
				splitIndex++;
			}
			else {
				if ((/^\d+$/.test(c))) {
					output += c;
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
    document.getElementById("output").value = output;
}