/**
 * Created by kamie kehrwald on 9/18/15.
 */
// this is where the main game logic will go
$(document).ready(function() {
    // Game variables
    var xp = 0;
    var st = 0;
    var def = 0;
    var backpack = {};
    var keywords = ["go", "take", "use", "attack", "hint"];
    var userInput = [];
    var actionWord = [];
    var descWord =[];

    //jquery variables
   //separating out the user input
    function separateText(){
        var separate = userInput.toString().split(' ');
        actionWord = separate[0];
        descWord = separate[1];
    }



    function playerText(next){
        var $p = $('<p>');
        $p.append("Player: " + userInput);
        $('#storyWell').append($p);
        return next
    }


    // handling inputs
    $("#userInput").keypress(function (e) {
        if (e.which == 13) {
            userInput = $(this).val();
            playerText();
            separateText();
            console.log(userInput);
            //alert(typeof separate);
            console.log("User Input: " + userInput + ", Action Word: " + actionWord + ", Description Word: " + descWord);
            verbSwitch();
        }

    });



    // verb handling switch
    function verbSwitch(){
        actionWord = actionWord.toLowerCase();
        var $p = $('<p>');

        switch (actionWord) {
            case "go":
                $p.append("You want to go to " + descWord);
                $("#storyWell").append($p);
                console.log("going...");

                break;
            case "take": // run function that checks if the requested item is available, and if so
                // moves the item to the backpack array
                // run function that appends the item text to the story well
                console.log('Taking ' + descWord);
                break;
            case 'use'://run function that checks if the requested item is in the back pack, and if so
                // checks for any actions from this item in this location, is so runs action and
                // removes it from the backpack.
                console.log("using " + descWord);
                break;
            case 'hint':
            //run function that grabs hint for this room
                console.log("getting hint...");
            default:
                $p.append("I don't know what you want");
                $("#storyWell").append($p);
                console.log('defaulted');

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

            }
        });
    }

    

    //Leveling Mechanic
    //level switch for upgrades
});

