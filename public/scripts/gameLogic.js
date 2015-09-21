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
    var userInput = [];

    //jquery variables
    var $p = ('<p>');
   //separating out the user input
    var separate = userInput.toString().split(' ');
    var actionWord = separate[0];
    var descWord = separate[1];


    // handling inputs
    $("#userInput").keypress(function (e) {
        if (e.which == 13) {
            userInput = $(this).val();
            console.log(separate);
            alert(typeof separate);
            console.log("User Input: " + userInput + ", Action Word: " + actionWord + ", Description Word: " + descWord);
            verbSwitch();
        }

    });



    // verb handling switch
    function verbSwitch(actionWord){
        //actionWord = actionWord.toLowerCase();

        switch (actionWord) {
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
            case 'hint':
            //run function that grabs hint for this room
            default:
                $("#storyWell").append("<p>I don't know what you want</p>");
                console.log('defaulted')
        }
    }

    // pulling JSON
    function getArea(descWord) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/locations',
            complete: function () {
                console.log('Ajax for getting area complete');
            },
            success: function (data) {
                $p.append
            }
        });
    }

    // displaying JSON

    //Leveling Mechanic
    //level switch for upgrades
});

