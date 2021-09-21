
// Multiplicative Cipher

// This code was written by Tyler Akins and is placed in the public domain.
// It would be nice if this header remained intact.  http://rumkin.com

// Requires util.js


// Perform a multiplicative transformation on the text
// encdec = -1 for decode, 1 for encode (kinda silly, but kept it like this
//    to be the same as the other encoders)
// text = the text to encode/decode
// key = the key to alter the alphabet
// alphabet = The alphabet to use if not A-Z
//ALPHABET is out of order because Christiansen says a starts at 1

//This functioned is unused
function multiplicative(mult, text, alphabet = 'ZABCDEFGHIJKLMNOPQRSTUVWXY', isDecrypt = "decrypt")
{
    var output = "";
    var inc = 0
    if (typeof(alphabet) != 'string')
       alphabet = 'ZABCDEFGHIJKLMNOPQRSTUVWXY';
    
    mult = mult * 1;
    inc = inc * 1;
    
    if (isDecrypt < 0) {
       var i = 1;
       while ((mult * i) % 26 != 1) {
           i += 2;
       }
       mult = i;
       inc = mult * (alphabet.length - inc) % alphabet.length;
    }
    
    key =  alphabet;
    
    for (var i = 0; i < text.length; i++)
    {
       var b = text.charAt(i);
       var idx;
       if ((idx = alphabet.indexOf(b)) >= 0)
       {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx);
       }
       else if ((idx = alphabet.indexOf(b.toUpperCase())) >= 0)
       {
            idx = (mult * idx + inc) % alphabet.length;
            b = key.charAt(idx);
       }
       output += b;
    }
    return output;
 }




