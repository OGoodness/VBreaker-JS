function hillEncrypt(input, keys) {
    var plaintext = input.toLowerCase().replace(/[^a-z]/g, "");
    var k = keys.toLowerCase().replace(/[^0-9 ]/g, "");
    var output = "";
    keys = k.split(" ");
    // do some error checking
    if (plaintext.length < 1) {
        alert("please enter some plaintext (letters and numbers only)");
        return;
    }
    if (plaintext.length % 2 == 1) {
        plaintext = plaintext + "x";
    }
    if (keys.length != 4) {
        alert("key should consist of 4 integers");
        return;
    }
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;

    for (i = 0; i < plaintext.length; i += 2) {
        output += String.fromCharCode((keys[0] * (plaintext.charCodeAt(i) - 96) + keys[1] * (plaintext.charCodeAt(i + 1) - 96)) % 26 + 96);
        output += String.fromCharCode((keys[2] * (plaintext.charCodeAt(i) - 96) + keys[3] * (plaintext.charCodeAt(i + 1) - 96)) % 26 + 96);
    }
    return output;
}

function hillDecrypt(input, keys) {
    var ciphertext = input.toLowerCase().replace(/[^a-z]/g, "");
    keys = keys.split(" ");
    // do some error checking 
    if (ciphertext.length < 1) {
        alert("please enter some ciphertext (letters only, numbers should be spelled)");
        return;
    }
    if (ciphertext.length % 2 == 1) {
        alert("ciphertext is not divisible by 2 (wrong algorithm?)");
        return;
    }

    if (keys.length != 4) {
        alert("key should consist of 4 integers");
        return;
    }
    for (i = 0; i < 4; i++)
        keys[i] = keys[i] % 26;
    // calc inv matrix
    var det = keys[0] * keys[3] - keys[1] * keys[2];
    det = ((det % 26) + 26) % 26;
    var di = 0;
    for (var i = 0; i < 26; i++) {
        if ((det * i) % 26 == 1) di = i;
    }
    if (di == 0) {
        alert("could not invert, try different key");
        return;
    }
    var ikeys = new Array(4);
    ikeys[0] = (di * keys[3]) % 26;
    ikeys[1] = (-1 * di * keys[1]) % 26;
    ikeys[2] = (-1 * di * keys[2]) % 26;
    ikeys[3] = di * keys[0];
    for (i = 0; i < 4; i++) {
        if (ikeys[i] < 0) ikeys[i] += 26;
    }
    var plaintext = "";
    for (i = 0; i < ciphertext.length; i += 2) {
        plaintext += String.fromCharCode((ikeys[0] * (ciphertext.charCodeAt(i) - 96) + ikeys[1] * (ciphertext.charCodeAt(i + 1) - 96)) % 26 + 96);
        plaintext += String.fromCharCode((ikeys[2] * (ciphertext.charCodeAt(i) - 96) + ikeys[3] * (ciphertext.charCodeAt(i + 1) - 96)) % 26 + 96);
    }
    
    return plaintext;
}