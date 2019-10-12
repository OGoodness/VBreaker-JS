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
