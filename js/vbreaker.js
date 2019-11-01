//VBreakerJS
//October 11, 2019
//Created by James Snider. Maintained by Noah Fields, Ivan Chwalik, and Patrick O'doherty
//For CSC483 Cryptology

//Global variables because im a bad programmer <3
var frequencyChart;
var shifterChart;
var alphabetTabs = new Array();
var alphabetTabContents = new Array();
var alphabetCharts = new Array();



//Solving Buttons
function encipher_Clicked() {
    var cipher = document.getElementById("cipherSelect");
    console.log(cipher.value);
    var keyword = getKeyword();
    switch (cipher.value) {
        case "Caesar":
          day = "Sunday";
          break;
        case "Multiplicative":
          day = "Monday";
          break;
        case "Affine":
           day = "Tuesday";
          break;
        case "Keyword":
            if (keyword != "") {
                var input = getInput();
                if (input != "") {
                    encipher(input, keyword);
                }
            }
          break;
        case "Hill":
          day = "Thursday";
          break;
        case "Columnar Transposition":
          day = "Friday";
          break;
        case "ADFGVX":
          day = "Saturday";
        default:
            
    }

}


function decipher_Clicked() {
    var cipher = document.getElementById("cipherSelect");
    console.log(cipher.value);
    var keyword = getKeyword();
    switch (cipher.value) {
        case "Caesar":
          day = "Sunday";
          break;
        case "Multiplicative":
          day = "Monday";
          break;
        case "Affine":
           day = "Tuesday";
          break;
        case "Keyword":
            if (keyword != "") {
                var input = getInput();
                if (input != "") {
                    decipher(input, keyword);
                }
            }
          break;
        case "Hill":
          day = "Thursday";
          break;
        case "Columnar Transposition":
          day = "Friday";
          break;
        case "ADFGVX":
          day = "Saturday";
        default:
            
    }
}
function clear_Clicked() {
    //Clear Inputs
    document.getElementById("keyword").value = "";
    document.getElementById("input").value = "";
    document.getElementById("output").value = "";

    //Hide Errors
    $("#inputWarning").fadeOut();

    //Hide IOC
    $("#ioc").fadeOut();
}


//Shifter Function
function getShifterValues(input) {
    input = getAlphabetStrips(input, 0)[0];
    var matches = new Array();
    for (var i = 1; i < input.length; i++) {
        matches[i] = 0;
        var comparisonString = input.substr(input.length - i, i) + input.substr(0, input.length - i);
        for (var x = 0; x < input.length; x++) {
            if (input[x] == comparisonString[x]) {
                matches[i]++;
            }
        }
    }
    return matches;
}



//Encipher/Decipher Helper Functions
function getShiftAmount(letter) {
    letter = letter.toUpperCase().charCodeAt(0);
    return letter - 'A'.charCodeAt(0);
}
function shiftLetter(input, amount) {
    var lowerBound = 'A'.charCodeAt(0);
    var upperBound = 'Z'.charCodeAt(0);
    if (input.charCodeAt(0) >= 'a'.charCodeAt(0)) {
        lowerBound = 'a'.charCodeAt(0);
        upperBound = 'z'.charCodeAt(0);
    }
    var code = input.charCodeAt(0);
    code += amount;
    if (code < lowerBound) {
        code = upperBound - (lowerBound - code) + 1;
    }
    else if (code > upperBound) {
        code = lowerBound + (code - upperBound) - 1;
    }
    return String.fromCharCode(code);
}
