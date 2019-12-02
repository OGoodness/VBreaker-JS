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
    //Need lengths to determine array dimensions, h is a counter to go through input characters
    total = input.length;
    columns = keyword.length;
    var h = 0;

    //We divide Input length by Keyword length to know the number of rows we need
    var rows = Math.ceil(total / columns);

    //Loop to create 2D array using 1D array
    var dArray = new Array(rows);
    for (var i = 0; i < dArray.length; i++){
        dArray[i] = []; //This makes it 2D
    }

    return dArray;
}

//This function takes the enciphering array and puts the cipher text in the Output
function outputCiphertext(keywordList, eArray){
    var cipherText = "";
    var outputList = [...keywordList];
    //Need to find smallest item in keywordList using Math.min(...array)
        //Use indexOf(element) to find the keyword letter
        //then indexOf(element, elementIndex) to search after that index
        //when it returns -1, you know there aren't others
    //remember splice and indexOf checks the current index before moving

    //Get the smallest letter and its index from keywordList
    var min = Math.min(...outputList);
    var minIndex = outputList.indexOf(min);
    var keyIndex = minIndex;
    //Put the ciphertext of the letter, including its duplicates
    while(minIndex != -1){
        //We pull from that column and add to our ciphertext
        for(var row = 0; row < eArray.length; row++){
            cipherText += eArray[row][keyIndex];
        }
        //We splice to remove element and redifine the minimums
        outputList.splice(minIndex, 1);
        min = Math.min(...outputList);
        keyIndex = keywordList.indexOf(min);
        minIndex = outputList.indexOf(min);
    }
    return cipherText;
    //Return single string that is output
}

//This function takes the deciphering array and puts the plain text in the Output
function outputPlaintext(keywordList, dArray){
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
    document.getElementsByClassName('tabulator-col')[0].click();
    return outputCiphertext(keywordList, eArray);

    //TESTING AREA BELOW 
    //$("#cipherModal").modal();
    //table.redraw();
}

//This function handles the deciphering process, remember in by columns and out by rows
function columnarDecipher(input, keyword){
    $("#modalHeader").text("Decrypting");
    var dArray = createDecipherArray(input, keyword);
    console.log(dArray);
    //I need to buildTable to load the data
    //var keywordList = keywordOrder(keyword);
    //return outputPlaintext(keywordList, dArray);
    
}

//This function handles the button Open Modal onclick event when user wants to see the table 
function openModal(){
    $("#modalHeader").text("Guess Keyword Length:");
    $("#keywordSize").removeClass("d-none");

    //Javascript Callback that will make the tabulator be formatted properly
    $("#cipherModal").show(function(){document.getElementsByClassName('tabulator-col')[0].click()});
    //input = getInput();
    //input = input.replace(/\s/ig, '');

    //If there is a keyword, we know we are just showing the input from the buildTable function
        //need to call buildTable();
    //If there isn't a keyword, we are guessing the keyword length

    //Need to pull input from header of modal, should be integer    
}