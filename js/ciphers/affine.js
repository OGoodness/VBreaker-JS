// Affine Cipher

// This code was written by Tyler Akins and is placed in the public domain.
// It would be nice if this header remained intact.  http://rumkin.com

// Requires util.js


// Perform a Affine transformation on the text
// encdec = -1 for decode, 1 for encode (kinda silly, but kept it like this
//    to be the same as the other encoders)
// text = the text to encode/decode
// inc = how far to shift the letters.
// key = the key to alter the alphabet
// alphabet = The alphabet to use if not A-Z
//ALPHABET is out of order because Christensen says a starts at 1
function affine(mult, inc, text, isDecrypt = "encrypt", alphabet = 'ZABCDEFGHIJKLMNOPQRSTUVWXY') {
    var output = "";

    if (typeof (alphabet) != 'string')
        alphabet = 'ZABCDEFGHIJKLMNOPQRSTUVWXY';

    mult = mult * 1;
    inc = inc * 1;

    // Popup to warn of incorrect keys and to avoid infinite loops
    if (mult % 2 == 0 || mult % 13 == 0) {
        window.alert("The multiplicative key cannot be zero, an even number, or a multiple of 13 when decoding!");
        mult = 1;
        inc = 0;
        isDecrypt = 0;
    }
    if (isDecrypt == "decrypt") {
        var i = 1;
        while ((mult * i) % 26 != 1) {
            i += 2;
        }
        mult = i;
        inc = mult * (alphabet.length - inc) % alphabet.length;
    }

    key = alphabet;

    for (var i = 0; i < text.length; i++) {
        var b = text.charAt(i);
        var idx;
        if ((idx = alphabet.indexOf(b)) >= 0) {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx);
        } else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0) {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx);
        }
        output += b;
    }
    return output;
}
 