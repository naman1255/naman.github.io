 /*
 <!--File: http://naman1255.github.io/hw7/firstScript.js
 91.461 Assignment 7: jQuery form validation
 Naman Jiandani, UMass Lowell Computer Science, njiandan@cs.uml.edu
 Copyright (c) 2016 by Naman Jiandani. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

Updated by NJ on December 7, 2016 at 10:00 pm 

Dependencies :
1.Backgroud image - http://cdn.pcwallart.com/images/colorado-mountain-landscape-wallpaper-1.jpg
2.jQuery API plugin - https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js

References:
1. https://www.w3schools.com/jQuery
2. Jose Flores 
*/



function calculate() {
    
    //getting input field data
    var first_r = document.getElementById('firstRow').value;
    var last_r = document.getElementById('lastRow').value;
    var first_c = document.getElementById('firstCol').value;
    var last_c = document.getElementById('lastCol').value;


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
   
    //sending input data as parameters
    create_table([first_c, last_c, first_r, last_r]);
    return false;
}
function create_table(new_array) {
    
    var first_c = new_array[0];
    var last_c = new_array[1];
    var first_r = new_array[2];
    var last_r = new_array[3];
    
    var i,j;
    

    //container for table content    
    var html = "";
    
    html += "<table class='form'>";
    //creating the top row and left column of table
    html += "<tr ><td class='toprow'></td>";
    for(var i = first_r; i <= last_r; i++) {
        html += "<td class ='toprow'>" + i + "</td>";
    }
    html += "</tr>";
    //generating the index multiplcation matrix
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

