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


//Each encipher and decipher function pulls a parent function from it's related JS page.
//If no input is provided, the getInput() function shows a warning and returns nothing.
//If there is no keyword, the getKeyword() shows a warning and returns nothing.

//Solving Buttons
function encipher_Clicked() {
    var cipher = document.getElementById("cipherSelect");
    var input = getInput();
    var keyword = getKeyword();
    switch (cipher.value) {
      case "Caesar":
        break;
      case "Multiplicative":
        day = "Monday";
        break;
      case "Affine":
          day = "Tuesday";
        break;
      case "Keyword":
        if (keyword != "") {
            if (input != "") {
              //encipher does not exist, create it in keyword.js
              keywordEncipher(input, keyword);
            }
        }
        break;
      case "Hill":
        day = "Thursday";
        break;
      case "Columnar Transposition":
        var keyword = getKeyword();
        if (keyword != "") {
          if (input != "") {
            //Remove spaces
            input = input.replace(/\s/ig, '');
            columnarEncipher(input, keyword);
          }
        }
        break;
      case "ADFGVX":
        day = "Saturday";
      default:
            
    }

}

function decipher_Clicked() {
    var cipher = document.getElementById("cipherSelect");
    var input = getInput();
    var keyword = getKeyword();
    switch (cipher.value) {
        case "Caesar":
          //check caesar.js
          break;
        case "Multiplicative":
          day = "Monday";
          break;
        case "Affine":
           day = "Tuesday";
          break;
        case "Keyword":
          if (keyword != "") {
            if (input != "") {
              //decipher does not exist, create it in keyword.js
              keywordDecipher(input, keyword);
            }
          }
          break;
        case "Hill":
          day = "Thursday";
          break;
        case "Columnar Transposition":
          if (keyword != "") {
            if (input != "") {
              //Remove spaces
              input = input.replace(/\s/ig, '');
              columnarDecipher(input, keyword);
            }
          }
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
