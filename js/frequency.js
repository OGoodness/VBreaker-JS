
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
