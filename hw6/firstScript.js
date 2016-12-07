/* 
 Authored by Naman Jiandani
 Last modified on November 13, 2016
*/

function calculate() {
	
    //getting input from user for row/col start and end values
    var first_r = Number(document.getElementById('firstRow').value);
    var last_r = document.getElementById('lastRow').value;
    var first_c = document.getElementById('firstCol').value;
    var last_c = document.getElementById('lastCol').value;
	
    //alert for same input values for row/col
    if(first_r === last_r || first_c === last_c) {
        alert("Please enter unique values for start and end row/col indices");
        return;
    }
	
	
	if ( (parseInt(first_r) === NaN) || (parseInt(first_c) === NaN) ||
	    (parseInt(last_r) === NaN) || (parseInt(last_c) === NaN) ) {
		return false;
	}
	
     //handles case when user enters greater number for row 1, lesser for row 2 (swaps them)
    if(last_r < first_r) {
        var temp1 = first_r;
        first_r = last_r;
        last_r = temp1;
    }
	
    //handles case when user enters greater number for column 1, lesser for column 2 (swaps them)
    if(last_c < first_c) {
        var temp2 = first_c;
        first_c = last_c;
        last_c = temp2;
    }

    //foundational 1-D array
    var myArray = [];
    var rowStart = 0;
    var columnStart = 0;

    //using myArray to create 2-D array (each entry in myArray is itself an array)
    for (var x = 0; x <= Math.abs((last_r - first_r)); x++) {
        myArray[x] = [];
    }
    
    //rowStart & columnstart are indices of myArray
    for(var a = first_c; a <= last_c; a++) {
        for(b = first_r; b <= last_r; b++) {
            myArray[rowStart][columnStart] = a * b; 
            //here we increment rowStart by 1, to go to next row element
            rowStart++;
        }
        //reset rowStart to zero for next iteration
        //increment columnStart by 1 for next column element
        rowStart = 0;
        columnStart++;
    }
   
    create_table(myArray);
    return false;
}
function create_table(new_array) {

	
    //getting input from user for row/col start and end values
    var first_r = Number(document.getElementById('firstRow').value) ;
    var last_r = Number(document.getElementById('lastRow').value);
    var first_c = Number(document.getElementById('firstCol').value);
    var last_c = Number(document.getElementById('lastCol').value);
    
 
    //creating a table 
    //adding a top-left empty element
    //loop through entries for first row and fill into top row of form 
    var fillTableWith = "";
    fillTableWith = fillTableWith + "<table class='form'>";
	fillTableWith = fillTableWith + "<tr ><td class='toprow'></td>";

    for(var i = first_r; i <= last_r; i++) {
        fillTableWith += "<td class ='toprow'>" + i + "</td>";
    }
    fillTableWith = fillTableWith + "</tr>";
	

    // Indices for new_array
    var rowStart = 0;
    var columnStart = 0;

    //rowStart & columnstart are indices of new_rray
    for(var a = first_c; a <= last_c; a++) {
        fillTableWith = fillTableWith + "<tr><td class ='leftcolumn'>" + a + "</td>";
        for(var b = first_r; b <= last_r; b++) {
            fillTableWith = fillTableWith + "<td class='tablebody'>" + new_array[rowStart][columnStart] + "</td>";
            //here we increment rowStart by 1, to go to next row element
            rowStart++;
        }
        //reset rowStart to zero for next iteration
        //increment columnStart by 1 for next column element
        rowStart = 0;
        columnStart++;
        fillTableWith = fillTableWith + "</tr>";
    }

        //close table
        fillTableWith = fillTableWith + "</table>";

        //set (send) table data to mult_table element
        $("#multiplication_table").html(fillTableWith);
}
