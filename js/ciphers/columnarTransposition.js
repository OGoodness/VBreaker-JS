/*
To Do:
--Need to calculate positions of columns based on keyword ASCII codes
--Make the headers of the columns the keyword
--Fix table not showing on inital load
*/

//This function puts the input into a 2D array based on keyword length
function createEncipherArray(input, keyword){
    //Need lengths to determine array dimensions, h is a counter to go through input characters
    total = input.length;
    columns = keyword.length;
    var h = 0;

    //We divide Input length by Keyword length to know the number of rows we need
    var rows = Math.ceil(total / columns);

    //Loop to create 2D array using 1D array
    var eArray = new Array(rows);
    for (var i = 0; i < eArray.length; i++){
        eArray[i] = []; //This makes it 2D
    }
    //Think of 'i' as the row and 'j' as the column
    //The loops move from left to right, then down to the next row
    var character;
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < columns; j++){
            character = input[h++];
            //If the input doesn't fit perfectly, we just use spaces
            if (typeof(character) == 'undefined'){
                eArray[i][j] = " ";
            }
            else{
                eArray[i][j] = character;
            }
        }
    }
    return eArray;
}

//This function puts the input into a 2D array based on the keyword
function createDecipherArray(input, keyword){
    //Need to determine column order
    //Need to create array that fills in each column
}

//This function uses Tabulator to create the table that will be shown
function buildTable(){
    var tableData = [
    {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
    {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
    {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
    ];

    var table = new Tabulator("#columnarTable",{
        data:tableData,
        movableColumns:true,
        autoColumns:true,
    });

    //table.redraw();
}

//This function handles the enciphering process, remember in by rows and out by columns
function columnarEncipher(input, keyword){
    $("#modalHeader").text("Encrypting");
    //Need to sort keyword based on ASCII charcodes to identify column order
    //Need to split input into sections based on keyword length
    
    var eArray = createEncipherArray(input, keyword);
    buildTable();
    $("#cipherModal").modal();
    //TESTING AREA BELOW
    
}

//This function handles the deciphering process, remember in by columns and out by rows
function columnarDecipher(input, keyword){
    $("#modalHeader").text("Decrypting");

    
}

//This function handles the button Open Modal onclick event when user wants to manually generate cipher
//This function is separate from the Encipher and Decipher buttons
function openModal(){
    $("#modalHeader").text("Guess Keyword Length:");
    $("#keywordSize").removeClass("d-none");
    $("#columnarTable").show();
    input = getInput();
    input = input.replace(/\s/ig, '');
    
    //Need to pull input from header of modal, should be integer

    //TESTING AREA BELOW
    $("#cipherModalBody").text(input);
}