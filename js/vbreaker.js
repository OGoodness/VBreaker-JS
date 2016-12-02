//VBreakerJS
//November 21st, 2016
//Created by James Snider
//For CSC483 Cryptology

//Global variables because im a bad programmer
var frequencyChart;
var shifterChart;
var alphabetTabs = new Array();
var alphabetTabContents = new Array();
var alphabetCharts = new Array();

//Input Functions
function getFrequencies_Clicked() {
    var input = getInput();
    if (input != "") {
        var freqs = getLetterFrequencies(input, 0);
        var output = getSortedFrequencyOutput(freqs, 0);
        freqs = getLetterFrequencies(input, 0);
        var ctx = document.getElementById("frequencyChart");
        if (frequencyChart != null) {
            frequencyChart.destroy();
        }
        frequencyChart = createFrequencyGraph(ctx, freqs, 0);
        document.getElementById("letterFrequencies").innerHTML = output;
        showFrequenciesMenu();
    }
}
function showFrequenciesMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#frequencies").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideFrequenciesMenu() {
    $("#frequencies")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "";
            });
}

function calculateIOC_Clicked() {
    var input = getInput();
    if (input != "") {
        var IOC = calculateIOC(input);
        document.getElementById("ioc").innerHTML = "Index of Coincidence is: " + IOC;
        $("#ioc").fadeIn();
    }
}

function stripAlphabets_Clicked() {
    var input = getInput();
    if (input != "") {
        var alphabets = document.getElementById("spinner").value;
        if (alphabets.length == 0 || isNaN(alphabets) || alphabets < 0) {
            $("#inputWarning").fadeIn();
            document.getElementById("inputWarning").innerHTML = "Number of Alphabets must be greater than or equal to one.";
        } else {
            var freqs = getLetterFrequencies(input, alphabets);
            var strips = getAlphabetStrips(input, alphabets);
            showAlphabetsMenu();
            for (var i = 0; i < alphabets; i++) {
                createAlphabetTab(i);
                createAlphabetTabContent(i, freqs, strips);
            }
        }
    }
}
function showAlphabetsMenu() {
    $("#mainmenu")
    .fadeOut(800,
        function () { //hide first div
            $("#alphabets").fadeIn(); //show second div when first div is fully hidden.
            document.getElementById("navbutton").style.display = "none";
        });
}
function hideAlphabetsMenu() {
    $("#alphabets")
    .fadeOut(800,
        function () { //hide first div
            $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
            for (var i = 0; i < alphabetTabs.length; i++) {
                alphabetTabs[i].parentElement.removeChild(alphabetTabs[i]);
                alphabetTabContents[i].parentElement.removeChild(alphabetTabContents[i]);
                alphabetCharts[i].destroy();
            }
            alphabetTabs = new Array();
            alphabetTabContents = new Array();
            alphabetCharts = new Array();
            document.getElementById("navbutton").style.display = "";
        });
}
function createAlphabetTab(index) {
    var tab = document.createElement("li");
    if (index == 0) {
        tab.className = "active";
    }
    document.getElementById("alphabetTabs").appendChild(tab);
    var tabTitle = document.createElement("a");
    tabTitle.href = "#" + (index + 1);
    tabTitle.setAttribute("data-toggle", "tab");
    tabTitle.innerHTML = "Strip " + (index + 1);
    tab.appendChild(tabTitle);
    alphabetTabs[index] = tab;
}
function createAlphabetTabContent(index, freqs, strips) {
    var tabContent = document.createElement("div");
    if (index == 0) {
        tabContent.className = "tab-pane active col-md-12";
    } else {
        tabContent.className = "tab-pane col-md-12";
    }
    tabContent.id = (index + 1);

    var container = document.createElement("div");
    container.style.display = "flex";
    tabContent.appendChild(container);
    var letters = document.createElement("p");
    letters.className = "lead";
    letters.style.textAlign = "center";
    letters.innerHTML = "Letters";
    letters.style.marginRight = "10px";
    letters.style.width = "50%";
    container.appendChild(letters);
    letters = document.createElement("p");
    letters.className = "lead";
    letters.style.textAlign = "center";
    letters.style.width = "50%";
    letters.innerHTML = "Letter Frequencies";
    letters.style.marginLeft = "10px";
    container.appendChild(letters);

    tabContent.appendChild(document.createElement("br"));

    container = document.createElement("div");
    container.style.display = "flex";
    tabContent.appendChild(container);

    letters = document.createElement("pre");
    letters.style.width = "50%";
    letters.style.marginRight = "10px";
    letters.style.whiteSpace = "pre-wrap";
    letters.style.wordBreak = "break-word";
    letters.innerHTML = strips[index] + "\n\nIndex of Coincidence: " + calculateIOC(strips[index]);
    container.appendChild(letters);


    letters = document.createElement("pre");
    letters.style.whiteSpace = "pre-wrap";
    letters.style.wordBreak = "break-word";
    letters.style.marginLeft = "10px";
    letters.style.width = "50%";
    var freqBackup = JSON.parse(JSON.stringify(freqs));
    letters.innerHTML = getSortedFrequencyOutput(freqs, index);
    container.appendChild(letters);
    freqs = freqBackup;

    document.getElementById("alphabetTabContents").appendChild(tabContent);

    var ctx = document.createElement("canvas");
    tabContent.appendChild(ctx);
    alphabetCharts[index] = createFrequencyGraph(ctx, freqs, index);

    alphabetTabContents[index] = tabContent;
}



function getNGraphs_Clicked() {
    var input = getInput();
    if (input != "") {
        var ngraphs = document.getElementById("spinner2").value;
        if (ngraphs.length == 0 || isNaN(ngraphs) || ngraphs < 0) {
            $("#inputWarning").fadeIn();
            document.getElementById("inputWarning").innerHTML = "Number of N-Graphs must be greater than or equal to one.";
        } else {
            showNGraphsMenu();
            document.getElementById("ngraphalphabetical").innerHTML = getNGraphsAlphabetically(input, ngraphs);
            document.getElementById("ngraphmostfrequent").innerHTML = getNGraphsByFrequency(input, ngraphs);
        }
    }
}
function showNGraphsMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#ngraphs").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideNGraphsMenu() {
    $("#ngraphs")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "";
            });
}

function runShifter_Clicked() {
    var input = getInput();
    if (input != "") {
        var labels = new Array();
        var values = new Array();
        var vals = getShifterValues(input);
        var output = "";
        for (var i = 1; i < vals.length; i++) {
            output += "Shift " + i + ": " + vals[i] + "\n";
            labels.push("Shift: " + i);
            values.push(vals[i]);
        }
        document.getElementById("shiftertext").innerHTML = output;
        shifterChart = createGraph(document.getElementById("shiftercanvas"), labels, values, "Number of Coincidences", true);
        showShifterMenu();
    }
}
function showShifterMenu() {
    $("#mainmenu")
        .fadeOut(800,
            function () { //hide first div
                $("#shifter").fadeIn(); //show second div when first div is fully hidden.
                document.getElementById("navbutton").style.display = "none";
            });
}
function hideShifterMenu() {
    $("#shifter")
        .fadeOut(800,
            function () { //hide first div
                $("#mainmenu").fadeIn(); //show second div when first div is fully hidden.
                shifterChart.destroy();
                document.getElementById("navbutton").style.display = "";
            });
}

//Solving Buttons
function encipher_Clicked() {
    var keyword = getKeyword();
    if (keyword != "") {
        var input = getInput();
        if (input != "") {
            encipher(input, keyword);
        }
    }
}
function decipher_Clicked() {
    var keyword = getKeyword();
    if (keyword != "") {
        var input = getInput();
        if (input != "") {
            decipher(input, keyword);
        }
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

//Frequency Functions
function getLetterFrequencies(input, alphabets) {
    var freq = new Array(alphabets);
    for (var i = 0; i <= alphabets; i++) {
        freq[i] = new Array();
    }
    var aIndex = 0;
    for (var i = 0; i <= alphabets; i++) {
        for (var z = 'A'.charCodeAt() ; z <= 'Z'.charCodeAt(0) ; z++) {
            freq[i][z] = 0;
        }
    }
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
            //Do everything in upper case.
            c = c.toUpperCase();
            freq[aIndex][c.charCodeAt(0)]++;
            aIndex++;
            if (aIndex >= alphabets) aIndex = 0;
        }
    }
    return freq;
}
function getAlphabetStrips(input, alphabets) {
    var strips = new Array(alphabets);
    for (var i = 0; i <= alphabets; i++) {
        strips[i] = "";
    }
    var aIndex = 0;
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
            //Do everything in upper case.
            c = c.toUpperCase();
            strips[aIndex] += c;
            aIndex++;
            if (aIndex >= alphabets) aIndex = 0;
        }
    }
    return strips;
}
function createFrequencyGraph(canvas, freqs, index) {
    var chartLabels = new Array();
    var chartValues = new Array();
    var chartIndex = 0;
    for (var z = 'A'.charCodeAt(0) ; z <= 'Z'.charCodeAt(0) ; z++) {
        chartLabels[chartIndex] = String.fromCharCode(z);
        chartValues[chartIndex] = freqs[index][z];
        chartIndex++;
    }
    return createGraph(canvas, chartLabels, chartValues, "# of Occurances", false);
}
function createGraph(canvas, labels, data, valueType, horizontal) {
    var chartType = "bar";
    if (horizontal) {
        chartType = "horizontalBar";
    }
    var fillColors = new Array();
    var outlineColors = new Array();
    for (var i = 0; i < labels.length; i++) {
        fillColors.push(getBarFillColor(i));
        outlineColors.push(getBarOutlineColor(i));
    }
    return new Chart(canvas, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: valueType,
                data: data,
                backgroundColor: fillColors,
                borderColor: outlineColors,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: !horizontal,
            legend: {
                display: horizontal,
                labels: {
                    display: horizontal
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
            }
        }

    });
}
function getBarFillColor(index) {
    var fillColors = ['rgba(255, 99, 132, .7)',
                    'rgba(54, 162, 235, .7)',
                    'rgba(255, 206, 86, .7)',
                    'rgba(75, 192, 192, .7)',
                    'rgba(153, 102, 255, .7)',
                    'rgba(255, 159, 64, .7)',
                    'rgba(0, 139, 0, .7)',
                    'rgba(255, 64, 64, .7)',
                    'rgba(24, 116, 205, .7)',
                    'rgba(238, 174, 14, .7)',
                    'rgba(255, 127, 0, .7)',
                    'rgba(65, 105, 225, .7)',
                    'rgba(221, 160, 221, .7)',
                    'rgba(255, 99, 132, .7)',
                    'rgba(54, 162, 235, .7)',
                    'rgba(255, 206, 86, .7)',
                    'rgba(75, 192, 192, .7)',
                    'rgba(153, 102, 255, .7)',
                    'rgba(255, 159, 64, .7)',
                    'rgba(0, 139, 0, .7)',
                    'rgba(255, 64, 64, .7)',
                    'rgba(24, 116, 205, .7)',
                    'rgba(238, 174, 14, .7)',
                    'rgba(255, 127, 0, .7)',
                    'rgba(65, 105, 225, .7)',
                    'rgba(221, 160, 221, .7)'];
    return fillColors[index % 26];
}
function getBarOutlineColor(index) {
    var outlineColors = ['rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 139, 0, 1)',
                    'rgba(255, 64, 64, 1)',
                    'rgba(24, 116, 205, 1)',
                    'rgba(238, 174, 14, 1)',
                    'rgba(255, 127, 0, 1)',
                    'rgba(65, 105, 225, 1)',
                    'rgba(221, 160, 221, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(0, 139, 0, 1)',
                    'rgba(255, 64, 64, 1)',
                    'rgba(24, 116, 205, 1)',
                    'rgba(238, 174, 14, 1)',
                    'rgba(255, 127, 0, 1)',
                    'rgba(65, 105, 225, 1)',
                    'rgba(221, 160, 221, 1)'];
    return outlineColors[index % 26];
}
function getSortedFrequencyOutput(freqs, index) {
    var output = "";
    var highest = 0;
    var highestIndex = 0;
    for (var z = 'A'.charCodeAt(0) ; z <= 'Z'.charCodeAt(0) ; z++) {
        for (var i = 'A'.charCodeAt(0) ; i <= 'Z'.charCodeAt(0) ; i++) {
            if (freqs[index][i] > highest) {
                highest = freqs[index][i];
                highestIndex = i;
            }
        }
        output += String.fromCharCode(highestIndex) + ":&nbsp" + highest + "\t\t";
        freqs[index][highestIndex] = -1;
        highest = -1;
        highestIndex = -1;
    }
    return output;
}

//NGraph Functions
function getNGraphsAlphabetically(input, size) {
    input = getAlphabetStrips(input, 0)[0];
    var ngraphs = new Array();
    for (var i = 0; i < input.length - size; i++) {
        var ngraph = "";
        for (var x = 0; x < size; x++) {
            ngraph += input[i + x];
        }
        if (ngraphs[ngraph] == null) {
            ngraphs[ngraph] = new Array();
        }
        ngraphs[ngraph].push(i);
    }

    //Sort the Ngraphs by alphabetical order
    var keys = [];

    for (var key in ngraphs) {
        if (ngraphs.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    keys.sort();



    var output = "";
    for (var i = 0; i < keys.length; i++) {
        output += keys[i] + ": ";
        for (var x = 0; x < ngraphs[keys[i]].length; x++) {
            output += ngraphs[keys[i]][x];
            if (x != ngraphs[keys[i]].length - 1) {
                output += ", ";
            } else {
                output += "\n";
            }
        }
    }
    return output;
}
function getNGraphsByFrequency(input, size) {
    input = getAlphabetStrips(input, 0)[0];
    var ngraphs = new Array();
    for (var i = 0; i < input.length - size; i++) {
        var ngraph = "";
        for (var x = 0; x < size; x++) {
            ngraph += input[i + x];
        }
        if (ngraphs[ngraph] == null) {
            ngraphs[ngraph] = new Array();
        }
        ngraphs[ngraph].push(i);
    }

    //Sort the Ngraphs by alphabetical order
    var keys = [];

    for (var key in ngraphs) {
        if (ngraphs.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    keys.sort();

    var output = "";
    for (var z = 0; z < keys.length; z++) {
        var highestCount = -1;
        var highestIndex = -1;
        for (var i = 0; i < keys.length; i++) {
            if (ngraphs[keys[i]].length > highestCount) {
                highestCount = ngraphs[keys[i]].length;
                highestIndex = i;
            }
        }
        output += keys[highestIndex] + ": ";
        for (var x = 0; x < ngraphs[keys[highestIndex]].length; x++) {
            output += ngraphs[keys[highestIndex]][x];
            if (x != ngraphs[keys[highestIndex]].length - 1) {
                output += ", ";
            } else {
                output += "\n";
            }
        }
        keys.splice(highestIndex, 1);
    }
    return output;
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

//IOC Function
function calculateIOC(input) {
    var freqs = getLetterFrequencies(input, 0);
    var totalLetters = 0;
    // 
    // Calculate the IOC
    // First, loop through the characters and
    // calculate the numerator
    var numerator = 0;
    for (var i = 'A'.charCodeAt(0) ; i <= 'Z'.charCodeAt(0) ; i++) {
        numerator += freqs[0][i] * (freqs[0][i] - 1);
        totalLetters += freqs[0][i];
    }

    // Calculate the denominator
    var denominator = totalLetters * (totalLetters - 1);

    // Calculate the IOC
    return numerator / denominator;
}

//Encipher/Decipher Functions
function encipher(input, keyword) {
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
			if (splitIndex == 6) {
				splitIndex = 0;
				output += " ";
			}
		}
    }
    document.getElementById("output").value = output;
}
function decipher(input, keyword) {
    var output = "";
    var keyIndex = 0;
	var retainFormatting = document.getElementById('formatCheckbox').checked;
	var splitIndex = 0;
    for (var x = 0; x < input.length; x++) {
        var c = input.charAt(x);
        if ((!/[^a-zA-Z]/.test(c))) {
            if (retainFormatting) {
				output += shiftLetter(c, -1 * getShiftAmount(keyword.charAt(keyIndex)));
			}
			else {
				output += shiftLetter(c, -1 * getShiftAmount(keyword.charAt(keyIndex))).toUpperCase();
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
			if (splitIndex == 6) {
				splitIndex = 0;
				output += " ";
			}
		}
    }
    document.getElementById("output").value = output;
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

//Input Checking Functions
function getKeyword() {
    var keyword = document.getElementById("keyword").value;
    if (keyword.length > 0 && (!/[^a-zA-Z]/.test(keyword))) {
        $("#inputWarning").fadeOut();
        return keyword.toUpperCase();
    }
    $("#inputWarning").fadeIn();
    document.getElementById("inputWarning").innerHTML = "Keyword must be provided and only consist of characters ranging from A-Z.";
    return "";
}
function getInput() {
    var input = document.getElementById("input").value;
    if (input.length > 0) {
        $("#inputWarning").fadeOut();
        return input;
    }
    $("#inputWarning").fadeIn();
    document.getElementById("inputWarning").innerHTML = "Input must be provided.";
    return "";
}

$(document).ready(function () {
    $('[data-toggle=offcanvas]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });
    $("#input").on('input', function (e) {
        $("#ioc").fadeOut();
    });
    $("#spinner").spinner({
        min: 1
    });
    $("#spinner2").spinner({
        min: 1
    });
    $("#spinner").width(100);
    $("#spinner2").width(100);
    document.getElementById("stripalphabets").addEventListener("click", function (e) {
        e = window.event || e;
        if (this === e.target) {
            // put your code here
            stripAlphabets_Clicked();
        }
    });
    document.getElementById("getngraphs").addEventListener("click", function (e) {
        e = window.event || e;
        if (this === e.target) {
            // put your code here
            getNGraphs_Clicked();
        }
    });
});


