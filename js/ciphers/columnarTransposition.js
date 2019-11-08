/*
Keyword length determines total number of columns
--User can input keyword and we generate solution
--User can use numeric input if they don't know keyword length

To Do:
--Create parent function that will be called
 --Parent will accept input value call child functions 
 **DONE columnarCipher handles parent functions
    --Create child functions that manipulate strings
        --Chop input up into model based on keyword length
            --Filter out input using 
            vbreaker.js has helper functions at the bottom that doesn't input special character
            --In by columns, out by rows
*/

function columnarCipher(input, keywordSize){
    //Remove spaces from input
    input = input.trim();
    input = input.replace(/\s/g, '');
    input = input.
}

var tableData = [
    {id:1, }
];

var table = new Tabulator("#traspositionCipher",{
    data:tableData,
});