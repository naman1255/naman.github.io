 /*File: naman1255.github.io/hw9/assignment.js
 91.461 Assignment 9: Scrabble Implementation
 Naman Jiandani, UMass Lowell Computer Science, njiandan@cs.uml.edu
 Copyright (c) 2016 by Naman Jiandani. All rights reserved. May be
freely copied or excerpted for educational purposes with credit to the
author.

This page has all the JavaScript that builds the interactivity for the Assignment.html file

Updated by NJ on December 6, 2016 at 11:00 pm 
 */

/* Creating a dictionary with given distribution and values */
var pieces = [
                      {"letter":"A", "value":1,  "amount":9, "remaining":9},
                      {"letter":"B", "value":3,  "amount":2, "remaining":2},
                      {"letter":"C", "value":3,  "amount":2, "remaining":2},
                      {"letter":"D", "value":2,  "amount":4, "remaining":4},
                      {"letter":"E", "value":1,  "amount":12, "remaining":12},
                      {"letter":"F", "value":4,  "amount":2, "remaining":2},
                      {"letter":"G", "value":2,  "amount":3, "remaining":3},
                      {"letter":"H", "value":4,  "amount":2, "remaining":2},
                      {"letter":"I", "value":1,  "amount":9, "remaining":9},
                      {"letter":"J", "value":8,  "amount":1, "remaining":1},
                      {"letter":"K", "value":5,  "amount":1, "remaining":1},
                      {"letter":"L", "value":1,  "amount":4, "remaining":4},
                      {"letter":"M", "value":3,  "amount":2, "remaining":2},
                      {"letter":"N", "value":1,  "amount":6, "remaining":6},
                      {"letter":"O", "value":1,  "amount":8, "remaining":8},
                      {"letter":"P", "value":3,  "amount":2, "remaining":2},
                      {"letter":"Q", "value":10, "amount":1, "remaining":1},
                      {"letter":"R", "value":1,  "amount":6, "remaining":6},
                      {"letter":"S", "value":1,  "amount":4, "remaining":4},
                      {"letter":"T", "value":1,  "amount":6, "remaining":6},
                      {"letter":"U", "value":1,  "amount":4, "remaining":4},
                      {"letter":"V", "value":4,  "amount":2, "remaining":2},
                      {"letter":"W", "value":4,  "amount":2, "remaining":2},
                      {"letter":"X", "value":8,  "amount":1, "remaining":1},
                      {"letter":"Y", "value":4,  "amount":2, "remaining":2},
                      {"letter":"Z", "value":10, "amount":1, "remaining":10},
                      {"letter":" ", "value":0,  "amount":2, "remaining":0}
                    ];

        /* Creating variables to hold values for our elements (self descriptive element names) */
        var word = "";
        var score = 0;
        var totalScore = 0;
        var distributedTiles = [];
        var dict = [];

     $(document).ready(function(){
	// load the words from file for dictationary
         $.get( "dict.txt", function( txt ) {
        // create an array of all the words in file
        var words = txt.split( "\n" );
             dict = words;
        // And add them as properties to the dictionary lookup
        // This will allow for fast lookups later
       // for ( var i = 0; i < words.length; i++ ) {
       //     dict[ words[i] ] = true;
       // }
    });
         
         //refreshes all tiles in board (also creates them)
         refreshTiles();
         
         //check if word exists on submit, compute score
         $("#submitWordBtn").click(function(){
             if( dict.indexOf(word.toLowerCase()) < 0){
                alert("there is no such word in dictionary called '" + word + "'"); 
                 refreshTiles();
             }
             else{
                 totalScore += score;
		 // display the total score 
                 $("#totalScore").text("Total Score : " + totalScore);
		 // refresh the tiles in hand
                 refreshTiles();
             }
         }); 

	     // animation on load of the page.
		$("#scrabble").slideDown(1200);
		$("#scrabbleBoard").fadeIn(1800);
		$("#scoreBoard").fadeIn(2400);


     });

        //reset all tiles on board and compute score (reset the game)
        function resetTiles(){
            refreshTiles();
            totalScore = 0;
            $("#totalScore").text("Total Score : " + totalScore);
        }
        
        //create our board by creating new tiles and appending them onto our board container
        function refreshTiles(){
	    //removing all children tiles of the board (we might have placed them earlier)
            $("#scrabbleBoard").empty();
	    //creating a 15x15 board i-->rows  j-->columns
            for(i = 0; i < 15 ; i++){
                 for (j = 0 ; j<15; j++){
		     //styling for 2X multiplier 
                     if(i==j || i+j == 14)
                        ele = "<div row='" + i + "' col='" + j + "' class='tileContainer droppable doubleScore'></div>";
                     else
			 //styling regular cell    
                         ele = "<div row='" + i + "' col='" + j + "' class='tileContainer droppable'></div>";
                    $("#scrabbleBoard").append($(ele)); 
                 }
             }
            
         // functionality for dropping tiles onto open spaces on board (registering the drop event on the tile container)
            $(".droppable").droppable({drop:function(event, ui){
             // check if the tile to be droped is taken fron hand so that we can drop this tile
                 if ($(ui.draggable).parent().attr("id") != "tileBoard" )
                     //dont drop it if not from our hand
                     ui.draggable.draggable('option', 'revert', true);
		     //dont drop if something is already dropped there
                 else if ($(this).children().length > 0){
                     ui.draggable.draggable('option', 'revert', true);
                 }
                 else{
                 // only allow to drop on either side of already placed tiles
                     if (distributedTiles.length < 7){
			 //check if next-neighbour tile is empty or not - only drop if empty
                         if ($(this).next().children().length > 0 || $(this).prev().children().length > 0){
                             dropPiece(ui, this);
                         }
                         else{
                             ui.draggable.draggable('option', 'revert', true);
                         }   
                        return;
                     }
		// if the 1st tile is getting dropped then allow it to be placed on any place
                  dropPiece(ui, this);     
                 }
             }});
            
            //generate random tiles for our hand
            $("#tileBoard").empty();
            for(i = distributedTiles.length; distributedTiles.length < 7; i++){
                ltrObj = pieces[getRandomInt(0,26)]
                if (ltrObj.remaining > 0)
		    //generating list of characters (tiles) in our hand	
                    distributedTiles.push(ltrObj);
            }
            //displaying all tiles in our hand container
            $.each(distributedTiles, function(idx, ltr){
                ele = "<div class='piece draggable'>" + ltr.letter + "<sub>" + ltr.value + "</sub></div>";
                $("#tileBoard").append($(ele)); 
            });
            //make all elements with class of draggable draggable
            $(".draggable").draggable();
            //resetting all values of our game round		
            word = "";
            score = 0;
	    //removing all tiles previously dropped on the board
            $("#scrabbleBoard").find(".piece").remove();
            $("#score").text("Score : " + score);
        }
	
	// place the dragged tile in the board
        function dropPiece(ui, ele){
            ui.draggable[0].removeAttribute("style");
             //$(ele).css("background","#fff");
             $(ele).append(ui.draggable[0]);
	     //finding letter in tile - first letter returned from .text()
             letter = $(ui.draggable[0]).text().substring(0,1);
             for(i = 0 ; i < distributedTiles.length; i++){
		 //removing used tile from our hand using splice
                 if (distributedTiles[i].letter == letter){
                     distributedTiles.splice(i,1);
                     break;
                 }
             }
	     //creating our word
	     // .parent() returns wrapper tile container
             //.next.children() returns child of neighhbour wrapper tile
             if ($(ui.draggable[0]).parent().next().children().length > 0){
		//prefix our letter to already created word     
                word = letter + word;}
             else{
		 //suffix our letter to already created word 
                 word += letter;}
            
	     //checking if we landed on a 2X score multiplier tile and updating score
             for(i = 0; i< pieces.length; i++){
                if (letter == pieces[i].letter){
                    if ($(ele).hasClass('doubleScore'))
                        score += pieces[i].value * 2;
                    else
                        score += pieces[i].value;
                }
            }
            //displaying score and word on UI
            $("#score").text("Score : " + score);
            console.log(word);
            $("#word").text("Word : " + word);
        }
        
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        
      
