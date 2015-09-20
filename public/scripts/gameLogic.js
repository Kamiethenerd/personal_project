/**
 * Created by kamie kehrwald on 9/18/15.
 */
// this is where the main game logic will go
$(document).ready(function() {
    // Game variables
    var xp = 0;
    var st = 0;
    var def = 0;
    var backpack = [];
    var keywords = ["go", "take", "use", "attack"];
    // handling inputs
    $("#userInput").keypress(function (e) {
        if (e.which == 13) {
            var userInput = $(this).val();
            console.log('You pressed enter! and entered' + userInput);
            console.log("Handler for .keypress() called.");
        }
    });

    if (userInput != keywords) {

    }
    ;
    // handling verbs
    // verb handling switch
    switch (userInput) {
        case "go": // run function that pulls the next location object
            break;
        case "take": // run function that checks if the requested item is available, and if so
            // moves the item to the backpack array
            // run function that appends the item text to the story well
            break;
        case 'use'://run function that checks if the requested item is in the back pack, and if so
            // checks for any actions from this item in this location, is so runs action and
            // removes it from the backpack.
            break;
    }

    // pulling JSON
    function getArea() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/locations',
            complete: function () {
                console.log('Ajax for getting area complete');
            },
            success: function (data) {
                $data.append($storyWell)
            }
        });
    }

    // displaying JSON

    //Leveling Mechanic
    //level switch for upgrades
});

