/*
To Do:
--TABULATOR PROBLEMS
    --Formating of table is all screwed up when the modal opens
    --Fix table not showing on closing the modal from Open Modal event
*/

//This function returns an list that is the number order of the keyword based on Unicode
function orderKeyword(keyword){
    var arraySize = keyword.length, keywordList = [], counter = 0;
    for(var i = 0; i < arraySize; i++){
        keywordList[i] = keyword.charCodeAt(i);
    }

    //This will output a list of the column order using counter
    var keywordOrdered = [...keywordList];
    var min = Math.min(...keywordList);
    while(counter < arraySize){
        //Check if min exists in keywordList
        while(keywordList.indexOf(min) === -1){
            min++;
        }

        //Place the column order of the current min item
        var minIndex = keywordList.indexOf(min);
        keywordOrdered[minIndex] = counter++;

        //Check for duplicates
        var dup = keywordList.indexOf(min, minIndex + 1);
        while(dup != -1){
            keywordOrdered[dup] = counter++;
            dup = keywordList.indexOf(min, dup + 1);
        }
        //Increment the minimum
        min++;
    }
    return keywordOrdered;
}

//This function puts the input into a 2D array based on keyword length
function createEncipherArray(input, keyword){
    //Need lengths to determine array dimensions
    let total = input.length;
    let columns = keyword.length;

    //We divide Input length by Keyword length to know the number of rows we need
    var rows = Math.ceil(total / columns);

    //Loop to create 2D array using 1D array
    var eArray = new Array(rows);
    for (var i = 0; i < eArray.length; i++){
        eArray[i] = []; //This makes it 2D
    }
    //Think of 'i' as the row and 'j' as the column
    //The loops move from left to right, then down to the next row
    //h is a counter to go through input characters
    var character, h = 0;
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < columns; j++){
            character = input[h++];
            //If the input doesn't fill in all spaces, we use 'x' for padding 
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
function createDecipherArray(input, keywordList){
    //Need lengths to determine array dimensions
    let total = input.length;
    let columns = keywordList.length;
    
    //We divide Input length by Keyword length to know the number of rows we need
    var rows = Math.ceil(total / columns);

    //Loop to create 2D array using 1D array
    var dArray = new Array(rows);
    for (var i = 0; i < dArray.length; i++){
        dArray[i] = []; //This makes it 2D
    }

    //Need to add dummy data so array indexes can be referenced later, or else undefined error
    for(var i = 0; i < rows; i++){
        for(var j = 0; j < columns; j++){
            dArray[i][j] = "";
        }
    }

    //We select a column based on keywordList and fill in characters moving down each row
    //h is a counter to go through input characters
    const max = Math.max(...keywordList);
    var character, h = 0;
    for(var column = 0; column <= max; column ++){
        for(var row = 0; row < dArray.length; row++){
            character = input[h++];
            //Notice how we go down each row and pick the index position of what keywordList item we are on
             dArray[row][keywordList.indexOf(column)] = character;
        }
    }
    return dArray;
}

//This function takes the enciphering array and returns ciphertext
function outputCiphertext(keywordList, eArray){
    var cipherText = "", max = Math.max(...keywordList);

    //We pull from that column and add to our ciphertext
    for(var column = 0; column <= max; column ++){
        for(var row = 0; row < eArray.length; row++){
            //Notice how we go down each row and pick the index position of what keywordList item we are on
            cipherText += eArray[row][keywordList.indexOf(column)];
        }
    }
    return cipherText;
}

//This function takes the deciphering array and returns the plaintext
function outputPlaintext(keywordList, dArray){
    var plainText = "", max = Math.max(...keywordList);
    
    //Remember, out by rows so just read through the array
    for(var row = 0; row < dArray.length; row++){
        for(var column = 0; column < keywordList.length; column++){
            plainText += dArray[row][column];
        }
    }
    return plainText;
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
    var keywordList = orderKeyword(keyword);
    buildTable();
    document.getElementsByClassName('tabulator-col')[0].click();
    return outputCiphertext(keywordList, eArray);
}

//This function handles the deciphering process, remember in by columns and out by rows
function columnarDecipher(input, keyword){
    $("#modalHeader").text("Decrypting");
    var keywordList = orderKeyword(keyword);
    var dArray = createDecipherArray(input, keywordList);
    buildTable();
    document.getElementsByClassName('tabulator-col')[0].click();
    return outputPlaintext(keywordList, dArray);
}

//This function handles the button Open Modal onclick event when user wants to see the table 
function openModal(){
    $("#modalHeader").text("Guess Keyword Length:");
    $("#keywordSize").removeClass("d-none");
    buildTable();
    //Javascript Callback that will make the tabulator be formatted properly
    $("#cipherModal").show(function(){document.getElementsByClassName('tabulator-col')[0].click()});
    //input = getInput();
    //input = input.replace(/\s/ig, '');

    //If there is a keyword, we know we are just showing the input from the buildTable function
        //need to call buildTable();
    //If there isn't a keyword, we are guessing the keyword length

    //Need to pull input from header of modal, should be integer    
}