/*
To Do:
--TABULATOR PROBLEMS
    --Formating of table is all screwed up when the modal opens
    --Fix table not showing on closing the modal from Open Modal event
*/

//This function returns an list that is the number order of the keyword based on Unicode
function keywordOrder(keyword){
    var arraySize = keyword.length;
    var keywordList = [];
    for(var i = 0; i < arraySize; i++){
        keywordList[i] = keyword.charCodeAt(i);
    }
    return keywordList;
}

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
                eArray[i][j] = "x";
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
    //Need to create array that fills in each column
    //I'll need to do some division to know what the dimensions of my array will be
    
    //return a 2D array called dArray;
}

//This function takes the enciphering array and puts the cipher text in the Output
function outputCiphertext(keywordList, eArray){
    var retainFormatting = document.getElementById('formatCheckbox').checked;
    //Need to split input into sections based on keyword length
    
    //I need to loop through and find what number is the smallest in the keywordList
        //Using what algorithm, i'm not sure what would be best
    //Then use that as the new minimum to find the next smallest

    //LOOK AT encipher.js AT HOW HE SPLIT THE INDEX AND MAINTAINED FORMATTING
    //I will output into 5 letter blocks if Retain Formatting isn't checked
    //If it is checked, i need to find that function that controls the output
}

//This function takes the deciphering array and puts the plain text in the Output
function outputPlaintext(keywordList, dArray){
    var retainFormatting = document.getElementById('formatCheckbox').checked;
    //Same notes as outputCiphertext() above
}

//This function uses Tabulator to create the table that will be shown
function buildTable(){
    //USE addData function TO AUTOMATE THIS, call it buildEncipheredTable
    var tableData = [
    {id:1, name:"Billy Bob", age:12, gender:"male", height:95, col:"red", dob:"14/05/2010"},
    {id:2, name:"Jenny Jane", age:42, gender:"female", height:142, col:"blue", dob:"30/07/1954"},
    {id:3, name:"Steve McAlistaire", age:35, gender:"male", height:176, col:"green", dob:"04/11/1982"},
    ];

    var table = new Tabulator("#columnarTable",{
        data:tableData,
        layout:"fitColumns",
        movableColumns:true,
        autoColumns:true
    });
    table.redraw();
    return table;
    //NEED TO HARD CODE WIDTHS OF THE COLUMNS SINCE THEY DON'T WANT TO REDRAW PROPERLY??
}

//This function handles the enciphering process, remember in by rows and out by columns
function columnarEncipher(input, keyword){
    $("#modalHeader").text("Encrypting");
    var eArray = createEncipherArray(input, keyword);
    var table = buildTable(); //I'll need to load the data into the modal, but in reality the Output will have the ciphered message.
    var keywordList = keywordOrder(keyword);
    //outputCiphertext(keywordList, eArray);

    //TESTING AREA BELOW 
    $("#cipherModal").modal();
    table.redraw();
}

//This function handles the deciphering process, remember in by columns and out by rows
function columnarDecipher(input, keyword){
    $("#modalHeader").text("Decrypting");
    //var dArray = createDecipherArray(input, keyword);
    //I need to buildTable to load the data
    //var keywordList = keywordOrder(keyword);
    //outputPlaintext(keywordList, dArray);
    
}

//This function handles the button Open Modal onclick event when user wants to see the table 
function openModal(){
    $("#modalHeader").text("Guess Keyword Length:");
    $("#keywordSize").removeClass("d-none");
    $("#columnarTable").show();
    //input = getInput();
    //input = input.replace(/\s/ig, '');

    //If there is a keyword, we know we are just showing the input from the buildTable function
        //need to call buildTable();
    //If there isn't a keyword, we are guessing the keyword length

    //Need to pull input from header of modal, should be integer    
}