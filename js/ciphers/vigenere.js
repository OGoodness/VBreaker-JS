function vigenere(input, keyword, direction) {
//Encipher/Decipher Functions
    var output = "";
    var keyIndex = 0;
    var retainFormatting = document.getElementById('formatCheckbox').checked;
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
            if (retainFormatting) {
                if (direction) {
                    output += shiftLetter(c, getShiftAmount(keyword.charAt(keyIndex)));
                } else {
                    output += shiftLetter(c, -1 * getShiftAmount(keyword.charAt(keyIndex)));
                }
            } else {
                if (direction) {
                    output += shiftLetter(c, getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
                } else {
                    output += shiftLetter(c, -1 * getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
                }
            }
            keyIndex++;
            if (keyIndex >= keyword.length) keyIndex = 0;
        } else {
            if (retainFormatting) {
                output += c;
            } else {
                if ((/^\d+$/.test(c))) {
                    output += c;
                }
            }
        }
    }
    return output;
}