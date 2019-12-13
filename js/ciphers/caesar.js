/* 
 * Caesar cipher
 * 
 * Copyright (c) 2017 Project Nayuki
 * All rights reserved. Contact Nayuki for licensing.
 * https://www.nayuki.io/page/caesar-cipher-javascript
 */



/* 
 * Handles the HTML input/output for Caesar cipher encryption/decryption.
 * This is the one and only entry point function called from the HTML code.
 */
function caeserCipher(shiftText, text, isDecrypt = "encrypt") {
	console.log(shiftText);
	console.log(text);
	$("#inputWarning").fadeOut();
	if (!/^-?\d+$/.test(shiftText)) {
		$("#inputWarning").fadeIn();
    	document.getElementById("inputWarning").innerHTML = "Shift must be an integer";
		return;
	}
	var shift = parseInt(shiftText, 10);
	if (shift < 0) {
		shift = 26 - Math.abs(shift);
    }
	if (isDecrypt != "encrypt"){
		shift = (26 - shift);
	}
	shift = shift % 26;
	console.log(shift);
	return caesarShift(text, shift);
} 


/* 
 * Returns the result of having each alphabetic letter of the given text string shifted forward
 * by the given amount, with wraparound. Case is preserved, and non-letters are unchanged.
 * Examples:
 * - caesarShift("abz",  0) = "abz".
 * - caesarShift("abz",  1) = "bca".
 * - caesarShift("abz", 25) = "zay".
 * - caesarShift("THe 123 !@#$", 13) = "GUr 123 !@#$".
 */
function caesarShift(text, shift) {
	var result = "";
	for (var i = 0; i < text.length; i++) {
		var c = text.charCodeAt(i);
		if      (65 <= c && c <=  90) {
			result += String.fromCharCode((c - 65 + shift) % 26 + 65);  // Uppercase
		}else if (97 <= c && c <= 122){
			 result += String.fromCharCode((c - 97 + shift) % 26 + 97);  // Lowercase
		}else{
			result += text.charAt(i);  // Copy
		}
	}
	console.log();
	return result;
}