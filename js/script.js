/*
File: script.js
GUI Assignment: Homework #4 Part 1
Daniel Quinonez, UMass Lowell Computer Science, daniel_quinonezrosario@student.uml.edu
Copyright (c) 2022 by Daniel. All rights reserved. May be freely copied or excerpted for educational purposes
with credit to the author.
Updated by DQ on December 23rd, 2022
*/

// add the document ready feature to make sure the page is ready to be manipulated with javascript
$(document).ready(function() {
    var $inputForm = $("#input_values");
    var $submitButton = $("#submit_button");

    // These two custom methods are modeled after the method created by the user RobJohnston at this github link:
    // https://github.com/jquery-validation/jquery-validation/issues/2030#issuecomment-328132469
    // the purpose of the method is to enable us to validate whether the maximum column and row values are greater
    // than or equal to the minimum values
    $.validator.addMethod( "greaterThanEqualTo", function ( value, element, param ) {
        var target = $( param );
    
        if ( this.settings.onfocusout && target.not( ".validate-greaterThanEqualTo-blur" ).length ) {
            target.addClass( "validate-greaterThanEqualTo-blur" ).on( "blur.validate-greaterThanEqualTo", function () {
                $(element).valid();
            });
        }
    
        return value >= target.val();
    }, "Please enter a value greater than or equal to the minimum");

    // the validation form below is based off of the webucator video found at the home page of https://jqueryvalidation.org/
    $inputForm.validate({
        rules:{
            minimum_column:{
                required: true,
                range:[-50,50]
            },
            maximum_column:{
                required: true,
                range:[-50,50],
                greaterThanEqualTo: minimum_column
            },
            minimum_row:{
                required: true,
                range:[-50,50]
            },
            maximum_row:{
                required: true,
                range:[-50,50],
                greaterThanEqualTo: minimum_row
            }
        },
        messages:{
            minimum_column:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50"
            },
            maximum_column:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50",
                greaterThanEqualTo: "Please enter a value that is greater than or equal to the minimum column value"
            },
            minimum_row:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50"
            },
            maximum_row:{
                required: "A value is required",
                range: "Please enter a value between -50 and 50",
                greaterThanEqualTo: "Please enter a value that is greater than or equal to the minimum row value"
            }
        }
    });
    
    // this click event is triggered whenever the Generate Table button is pressed, it is where we check to see if 
    // the form validated successfully so we can build the table
    $submitButton.click(function() {
        // console.log($inputForm.valid());
        // if all validations are passed, then build the table
        if($inputForm.valid()) {
            let min_col = document.getElementById("minimum_column").value;
            let max_col = document.getElementById("maximum_column").value;
            let min_row = document.getElementById("minimum_row").value;
            let max_row = document.getElementById("maximum_row").value;
        
            var output = "<div id='my_table'><table>";
            var first_row = 1;

            // this loop handles the actual generation of my multiplication table
            for(i = min_row - 1; i <= max_row; i++) {
                output += "<tr>";
                
                // handles the creation of every row after the first row
                if(first_row == 0) {
                    output += "<th class='table_header first_column'>" + i + "</th>";

                    for(j = min_col; j <= max_col; j++) {
                        output += "<td class='table_cell'>" + (i * j) + "</td>";
                    }
                }
                
                // handles the creation of first row
                if(first_row == 1) {
                    output += "<th class='first_cell'></th>";

                    for(j = min_col; j <= max_col; j++) {
                        output += "<th class='table_header first_row'>" + j + "</th>";
                    }

                    first_row = 0;
                }

                output += "</tr>";
            }
            
            output += "</table></div>";
            document.getElementById("mult_table").innerHTML = output;
        }
    });
});
