/* 
 Authored by Naman Jiandani
 Last modified on November 13, 2016
*/

function calculate() {
	
    //getting input from user for row/col start and end values
    var first_r = parseInt(document.getElementById('firstRow').value);
    var last_r = parseInt(document.getElementById('lastRow').value);
    var first_c = parseInt(document.getElementById('firstCol').value);
    var last_c = parseInt(document.getElementById('lastCol').value);

    if (first_r === NaN || 
	first_c === NaN ||
	last_r === NaN ||
	last_c === NaN ) {
    	return false;
    }
	
    //alert for same input values for row/col
    if(first_r === last_r || first_c === last_c) {
        alert("Please enter unique values for start and end row/col indices");
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
   
    create_table([first_c, last_c, first_r, last_r]);
    return false;
}
function create_table(new_array) {
    
    var first_c = new_array[0];
    var last_c = new_array[1];
    var first_r = new_array[2];
    var last_r = new_array[3];
    
    var i,j;
	
    //creating a table 
    //adding a top-left empty element
    //loop through entries for first row and fill into top row of form 
	
    var html = "";
	
    html += "<table class='form'>";
    
    html += "<tr ><td class='toprow'></td>";
    for(var i = first_r; i <= last_r; i++) {
        html += "<td class ='toprow'>" + i + "</td>";
    }
    html += "</tr>";

    for(var i = first_c; i <= last_c; i++){
	html += "<tr><td class ='toprow'>" + i + "</td>";
        for(var j = first_r; j <= last_r; j++) {
            html += "<td class ='toprow'>" + (i * j) + "</td>";
        }
	html += "</tr>";
    }
    html += "</table>";

    //set (send) table data to mult_table element
    $("#multiplication_table").html(html);
}
