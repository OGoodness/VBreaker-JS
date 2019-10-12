
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