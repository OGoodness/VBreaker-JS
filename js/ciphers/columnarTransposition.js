/*
Keyword length determines total number of columns
--User can input keyword and we generate solution
--User can use numeric input if they don't know keyword length

3 buttons:
Encipher
Decipher
Open Modal

To Do:
--Create 3 functions for encipher, decipher, and opening modal
    --Create child functions that manipulate strings
        --Chop input up based on keyword length
            --In by columns, out by rows
            --Need to calculate positions of columns based on keyword ASCII
*/

//This function uses Tabulator to create the table that will be shown
function buildTable(){
    var tableData = [
        {id:1, }
    ];

    var table = new Tabulator("#traspositionCipher",{
        data:tableData,
    });
}

//This function is the parent that handles 
function columnarCipher(input, keyword){
    //Remove non-numeric and non-alphabetic characters from input and keyword
    input = input.replace(/[^A-Z0-9]/ig, '');
    keyword = keyword.replace(/[^A-Z0-9]/ig, '');
    
    //TESTING AREA BELOW
    console.log(keyword);
    console.log(input);

    $("#cipherModalBody").text(input);
    $("#cipherModal").modal();
}

//This function handles the button Open Modal onclick event 
function openModal(){
    input = getInput();
    //Remove anything not alphabetic
    input = input.replace(/[^A-Z0-9]/ig, '');
    $("#cipherModalBody").text(input);
}